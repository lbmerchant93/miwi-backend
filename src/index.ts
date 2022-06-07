import "reflect-metadata";
import { PrismaClient } from "./generated/prisma-client/index";
import { Authorized, buildSchema } from "type-graphql";
import { 
  applyResolversEnhanceMap,
  ResolversEnhanceMap,
  JournalEntryCrudResolver,
  UserCrudResolver,
  relationResolvers
} from "./generated/type-graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { JournalEntryOverrideResolver } from './views/graphql/journalEntryResolvers';
import { UserOverrideResolver } from "./views/graphql/userResolvers";
import { expressAuthnMiddleware } from './authn';

export interface ApolloContext {
  expressContext: {
    req: express.Request,
    res: express.Response
  };
  prisma: PrismaClient;
};

const prisma = new PrismaClient();

async function main() {
  const forceEntityAuth = <T extends keyof ResolversEnhanceMap>(entity: T) => ({
    [`create${entity}`]: [Authorized()],
    [`createMany${entity}`]: [Authorized()],
    [`delete${entity}`]: [Authorized()],
    [`deleteMany${entity}`]: [Authorized()],
    [`update${entity}`]: [Authorized()],
    [`updateMany${entity}`]: [Authorized()],
    [`upsert${entity}`]: [Authorized()],
  });
  applyResolversEnhanceMap({
    User: forceEntityAuth("User"),
    JournalEntry: forceEntityAuth("JournalEntry"),
});
  const schema = await buildSchema({
    resolvers: [
      JournalEntryCrudResolver,
      UserCrudResolver,
      JournalEntryOverrideResolver,
      UserOverrideResolver,
      ...relationResolvers
    ],
    authChecker: ({ root, args, context, info}) => {
      // console.log(context.expressContext.req.userId, 'userId')
      if(!context.expressContext.req.userId) {
        return false;
      } 
      return true;
    },
    validate: false,
  });
   
  // Connect the client
  await prisma.$connect()

  const app = express();
  const PORT = process.env.PORT || 9000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(expressAuthnMiddleware);
  
  const apollo = new ApolloServer({
    schema,
    context: ({ req, res }): ApolloContext => ({ expressContext: { req, res }, prisma })
  });

  await apollo.start();

  apollo.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}/graphql`));
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })