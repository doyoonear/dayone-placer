const { Repository } = require("./Repository");

const knex = require("../support/db-connection");

class PartRepository extends Repository {
  constructor() {
    super({ table: "part" });
  }

  updateMoveLocation(roomId, prevX, prevY, nextX, nextY) {
    return knex(this.table)
      .where({ room_id: roomId, location_x: prevX, location_y: prevY })
      .where({ state: "NORMAL " })
      .update({ location_x: nextX, location_y: nextY });
  }

  deleteByRoomIdAndLocationXAndLocationY(roomId, locationX, locationY) {
    return knex(this.table)
      .where({ room_id: roomId, location_x: locationX, location_y: locationY })
      .where({ state: "NORMAL " })
      .update({ state: "NORMAL" });
  }

  updateMemberIdByLocation(memberId, roomId, location) {
    return knex(this.table)
      .where({ ...location, roomId })
      .update({ memberId, type: "MEMBER" });
  }
}

module.exports = {
  partRepository: new PartRepository(),
};
