const { Repository } = require("./Repository");

class PartRepository extends Repository {
  constructor() {
    super({ table: "part" });
  }
}

module.exports = {
  partRepository: new PartRepository(),
};
