const { Repository } = require("./Repository");

class AccountRepository extends Repository {
  constructor() {
    super({ table: "account" });
  }
}

module.exports = {
  accountRepository: new AccountRepository(),
};
