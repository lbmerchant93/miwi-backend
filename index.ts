import "reflect-metadata";
import { PrismaClient } from "./src/generated/prisma-client/index";
import { buildSchema } from "type-graphql";
import { 
  JournalEntryCrudResolver,
  UserCrudResolver,
  relationResolvers
} from "./src/generated/type-graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

export interface ApolloContext {
  expressContext: {
    req: express.Request,
    res: express.Response
  };
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

async function main() {
  const schema = await buildSchema({
    resolvers: [
      JournalEntryCrudResolver,
      UserCrudResolver,
      ...relationResolvers
    ],
    validate: false,
  });
   
  // Connect the client
  await prisma.$connect()

  // await prisma.user.create({
  //   data: {
  //     id: "fV5De0bivMRqBoHxJuwT4UwFJtT2",
  //     displayName: "luc mer",
  //     firstName: "luc",
  //     lastName: "mer",
  //     email: "test@test.com",
  //   }
  // })

  // await prisma.journalEntry.create({
  //   data: {
  //     date: "2022-03-08T19:58:57.000Z",
  //     exercise: 2,
  //     garlandPose: 2,
  //     kegels: 2,
  //     prenatalVitamins: true,
  //     probiotics: true,
  //     proteinIntake: 2,
  //     authorId: "fV5De0bivMRqBoHxJuwT4UwFJtT2",
  //     waterIntake: 2
  //   }
  // })

  // await prisma.journalEntry.delete({
  //   where: {
  //     id: 1
  //   }
  // })

  // ... you will write your Prisma Client queries here
  // const allusers = await prisma.user.findMany()
  // console.log(allusers)
  // const allEntries = await prisma.journalEntry.findMany()
  // console.log(allEntries)

  const app = express();
  const PORT = 9000;

  app.use(cors());
  
  const apollo = new ApolloServer({
    schema,
    context: ({ req, res }): ApolloContext => ({ expressContext: { req, res }, prisma })
  })

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