const { roomRepository } = require("../../repository/roomRepository");
const { Service } = require("../Service");

class RoomService extends Service {
  constructor() {
    super({ repository: roomRepository });
  }
}

module.exports = {
  roomService: new RoomService(),
};
