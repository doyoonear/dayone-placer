const toView = (item) => {
  const data = {};
  for (const [key, name] of Object.entries(item)) {
    data[toCamelCase(key)] = name;
  }

  return data;
};

const toViews = (list) => {
  return list.map(toView);
};

const SNAKE_CASE_REGEXP = /(.*?)_+([a-zA-Z])/g;
const toCamelCase = (str) => {
  if (!str) {
    return;
  }

  return str.replace(SNAKE_CASE_REGEXP, (m, p1, p2) => `${p1}${p2.toUpperCase()}`);
};

module.exports = {
  toView,
  toViews,
};
