var express = require("express");
var schema = require( "./schema");
var root = require( "./resolver");
var graphqlHTTP = require( "express-graphql");
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');

let dev_db_url = 'mongodb://localhost:27017/productDb';

const mongoDB = process.env.MONGODB_URI || dev_db_url;

// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const port = 4000;

// db.on('success',console.log("Mongodb connected."))

app.use(
  cors()
)

app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    })
  );

  mongoose.connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  })
  .catch(err => {
    console.log(err);
  })