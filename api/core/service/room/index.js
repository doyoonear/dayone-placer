const { roomRepository } = require("../../repository/roomRepository");
const { Service } = require("../Service");

const { memberService } = require("../member");

class RoomService extends Service {
  constructor() {
    super({ repository: roomRepository });
  }

  // /** @override */
  // async getById(id) {
  //   const room = await super.getById(id);
  //
  //   // part, member
  //   const member = await memberService.findAll({});
  // }
}

module.exports = {
  roomService: new RoomService(),
};
