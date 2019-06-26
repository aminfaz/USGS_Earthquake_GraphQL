const express = require('express');
const graphql = require('../routes/graphql.route');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/graphql', graphql);
  app.use(error);
}