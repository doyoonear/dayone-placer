const { partRepository } = require("../../repository/partRepository");
const { Service } = require("../Service");

class PartService extends Service {
  constructor() {
    super({ repository: partRepository });
  }
}

module.exports = {
  partService: new PartService(),
};
