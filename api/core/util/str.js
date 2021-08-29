const SNAKE_CASE_REGEXP = /(.*?)_+([a-zA-Z])/g;
const toCamelCase = (str) => {
  if (typeof str !== "string" || !str.length) {
    return str;
  }

  return str.replace(SNAKE_CASE_REGEXP, (m, p1, p2) => `${p1}${p2.toUpperCase()}`);
};

const CAMEL_CASE_REGEXP = /(.+?)([A-Z])/g;
const toSnakeCase = (str) => {
  if (typeof str !== "string" || !str.length) {
    return str;
  }
  return str.replace(CAMEL_CASE_REGEXP, (m, p1, p2) => `${p1}_${p2}`.toLowerCase());
};

module.exports = {
  toCamelCase,
  toSnakeCase,
};
