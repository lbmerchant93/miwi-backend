require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;

async function startServer() {
  const app = express()
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app, path: '/dev' });

  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
    if (err) {
      console.log("Connection to Database failed.");
    }
    else{
      console.log("Database connection successful.");
    }
  });

  app.listen(4000, () => console.log("Server is running on port 4000"));
}
startServer();