const { generateAccessToken } = require("../../util/auth");

const signIn = async (email, password) => {
  if (email !== "test") {
    throw new Error("아이디가 올바르지 않음");
  }

  if (password !== "test") {
    throw new Error("암호가 올바르지 않음");
  }

  const principal = { id: 1, level: 50, name: "홍길동" };

  const accessToken = generateAccessToken(principal);
  return accessToken;
};

module.exports = {
  signIn,
};
