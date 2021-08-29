const connection = require("../../config/db");

const knex = require("knex")({
  client: "mysql2",
  connection,
});

module.exports = knex;
