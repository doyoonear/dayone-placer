const connection = require("../../config/db");
const { toCamelCase, toSnakeCase } = require("../util/str");

const objectEntryKeyConvert = (obj) => {
  if (!obj) {
    return;
  }
  const data = {};
  for (const [key, value] of Object.entries(obj)) {
    data[toCamelCase(key)] = value;
  }
  return data;
};

const knex = require("knex")({
  client: "mysql2",
  connection,
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      return result.map((row) => objectEntryKeyConvert(row));
    } else {
      return objectEntryKeyConvert(result);
    }
  },
  wrapIdentifier: (value, origImpl, queryContext) => origImpl(toSnakeCase(value)),
});

module.exports = knex;
