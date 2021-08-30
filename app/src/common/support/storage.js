const setStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

const getStorage = (key) => {
  return localStorage.getItem(key);
};

module.exports = {
  setStorage,
  getStorage,
};
