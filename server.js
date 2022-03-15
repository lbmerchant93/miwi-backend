const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

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

  mongoose.connect('mongodb+srv://miwiadmin:miwiadmin@cluster0.i54ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }, err => {
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