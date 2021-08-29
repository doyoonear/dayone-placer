const { partRepository } = require("../../repository/partRepository");
const { Service } = require("../Service");

class PartService extends Service {
  constructor() {
    super({ repository: partRepository });
  }

  updateMoveLocation({ roomId, location }) {
    const { prevX, prevY, nextX, nextY } = location;
    return partRepository.updateMoveLocation(roomId, prevX, prevY, nextX, nextY);
  }

  // TODO: transaction
  async updateChangeLocation({ roomId, location }) {
    const { prevX, prevY, nextX, nextY } = location;

    const prevPart = await partRepository.selectFirst({ roomId, locationX: prevX, locationY: prevY });
    await partRepository.updateMoveLocation(roomId, nextX, nextY, prevX, prevY);
    return partRepository.updateById(prevPart.id, { locationX: nextX, locationY: nextY });
  }

  deleteLocation({ roomId, location }) {
    const { x, y } = location;
    return partRepository.deleteByRoomIdAndLocationXAndLocationY(roomId, x, y);
  }
}

module.exports = {
  partService: new PartService(),
};
