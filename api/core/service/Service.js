const { toViews, toView } = require("./support/mapper");

class Service {
  constructor({ repository }) {
    this.repository = repository;
  }

  async find() {
    const result = await this.repository.select();
    return toViews(result);
  }

  async getById(id) {
    const result = await this.repository.selectById(id);
    return toView(result);
  }

  async findAll(query) {
    const result = await this.repository.selectAll(query);
    return toViews(result);
  }

  create(data) {
    return this.repository.insert(data);
  }

  updateById(id, data) {
    return this.repository.updateById(id, data);
  }

  deleteById(id) {
    return this.repository.deleteById(id);
  }
}

module.exports = {
  Service,
};
