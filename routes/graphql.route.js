const express = require("express");
const app = express();
const cors = require('cors');
const earthquakeSchema = require("../schemas/earthquake.schema");
const earthquakeResolver = require("../resolvers/earthquake.resolver");
const winston = require('winston');

const logger = new(winston.Logger)({
  transports: [
    new(winston.transports.File)({
      filename: 'requestsErrors.log'
    })
  ]
});

const graphqlHTTP = require("express-graphql");

app.use(cors());
app.use(
  "/",
  graphqlHTTP({
    schema: earthquakeSchema,
    rootValue: earthquakeResolver,
    graphiql: true,
    customFormatErrorFn: error => {
      const params = {
        message: "An error has occured processing the request",
      };
      logger.error(error.message, error.stack);
      return (params);
    }
  })
);

module.exports = app;