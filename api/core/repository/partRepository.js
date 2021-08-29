const { Repository } = require("./Repository");

const knex = require("../support/db-connection");

class PartRepository extends Repository {
  constructor() {
    super({ table: "part" });
  }

  updateMoveLocation(roomId, prevX, prevY, nextX, nextY) {
    return knex(this.table)
      .where({ room_id: roomId, location_x: prevX, location_y: prevY })
      .update({ location_x: nextX, location_y: nextY });
  }
}

module.exports = {
  partRepository: new PartRepository(),
};
