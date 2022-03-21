import "reflect-metadata";
import { PrismaClient } from "./src/generated/prisma-client/index";
// need to update this to point to a generated path
// const express = require('express');
// const graphql = require('graphql');
// const { ApolloServer } = require('apollo-server-express');

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect()

  // await prisma.journalEntry.create({
  //   data: {
  //     date: "2022-03-08T19:58:57.000Z",
  //     exercise: 2,
  //     garlandPose: 2,
  //     kegels: 2,
  //     prenatalVitamins: true,
  //     probiotics: true,
  //     proteinIntake: 2,
  //     userId: "fV5De0bivMRqBoHxJuwT4UwFJtT2",
  //     waterIntake: 2
  //   }
  // })
  // ... you will write your Prisma Client queries here
  const allEntries = await prisma.journalEntry.findMany()
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