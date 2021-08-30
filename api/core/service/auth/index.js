const { generateAccessToken, generateShaSignature } = require("../../util/auth");
const { accountRepository } = require("../../repository/accountRepository");

const signIn = async (email, password) => {
  const hashPassword = generateShaSignature(password);

  const account = await accountRepository.selectFirst({ email, password: hashPassword });
  if (!account) {
    throw new Error("로그인 정보가 올바르지 않습니다.");
  }

  const accessToken = generateAccessToken(account);
  return accessToken;
};

module.exports = {
  signIn,
};
