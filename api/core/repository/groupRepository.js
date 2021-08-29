const { Repository } = require("./Repository");

class GroupRepository extends Repository {
  constructor() {
    super({ table: "group" });
  }
}

module.exports = {
  groupRepository: new GroupRepository(),
};
