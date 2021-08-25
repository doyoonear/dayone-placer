const { generateAccessToken } = require("../../util/auth");

const signIn = async (email, password) => {
  const principal = { id: 1, level: 50, name: "홍길동" };

  const accessToken = generateAccessToken(principal);
  return accessToken;
};

module.exports = {
  signIn,
};
