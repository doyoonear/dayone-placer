class Service {
  constructor({ repository }) {
    this.repository = repository;
  }

  find() {
    return this.repository.select();
  }

  getById(id) {
    return this.repository.selectById(id);
  }

  findAll(query) {
    return this.repository.selectAll(query);
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
