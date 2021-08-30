const knex = require("../support/db-connection");

class Repository {
  constructor({ table }) {
    this.table = table;
  }

  select() {
    return knex(this.table).where({ state: "NORMAL " }).select();
  }

  selectAll(query) {
    return knex(this.table).where(query).where({ state: "NORMAL " }).select();
  }

  selectAllByIds(ids) {
    return knex(this.table).whereIn("id", ids).where({ state: "NORMAL " }).select();
  }

  selectFirst(query) {
    return knex(this.table).where(query).where({ state: "NORMAL " }).first();
  }

  selectById(id) {
    return knex(this.table).where({ id }).where({ state: "NORMAL " }).first();
  }

  insert(data) {
    return knex(this.table).insert(data);
  }

  updateById(id, data) {
    return knex(this.table).where({ id }).where({ state: "NORMAL " }).update(data);
  }

  deleteById(id) {
    // return knex(this.table).where({ id }).delete();
    return knex(this.table).where({ id }).where({ state: "NORMAL " }).update({ state: "DELETED " });
  }
}

module.exports = { Repository };
