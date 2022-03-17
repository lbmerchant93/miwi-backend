import "reflect-metadata";
import { PrismaClient } from "./node_modules/.prisma/client/index";
// need to update this to point to a generated path
const express = require('express');
const graphql = require('graphql');
const { ApolloServer } = require('apollo-server-express');

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  const allEntries = await prisma.journalentries.findMany()
  console.log(allEntries)
  // const app = express();
  // const PORT = 5432;

  // const apollo = new ApolloServer({

  // })

  // await apollo.start();

  // apollo.applyMiddleware({ app });

  // app.listen(PORT, () => console.log("App listening on port 5000"));

}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })