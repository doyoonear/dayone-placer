const knex = require("../support/db-connection");

class Repository {
  constructor({ table }) {
    this.table = table;
  }

  select() {
    return knex(this.table).select();
  }

  selectAll(query) {
    return knex(this.table).where(query).select();
  }

  selectFirst(query) {
    return knex(this.table).where(query).first();
  }

  selectById(id) {
    return knex(this.table).where({ id }).first();
  }

  insert(data) {
    return knex(this.table).insert(data);
  }

  updateById(id, data) {
    return knex(this.table).where({ id }).update(data);
  }

  deleteById(id) {
    return 1;
    // return knex(this.table).where({ id }).delete();
  }
}

module.exports = { Repository };
