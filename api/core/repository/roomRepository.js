const { Repository } = require("./Repository");

class RoomRepository extends Repository {
  constructor() {
    super({ table: "room" });
  }
}

module.exports = {
  roomRepository: new RoomRepository(),
};
