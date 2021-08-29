const { Repository } = require("./Repository");

const knex = require("../support/db-connection");

class MemberRepository extends Repository {
  constructor() {
    super({ table: "member" });
  }

  findAllGroupIds(groupIds) {
    return knex(this.table).whereIn("group_id", groupIds).select();
  }
}

module.exports = {
  memberRepository: new MemberRepository(),
};
