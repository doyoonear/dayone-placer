const { partRepository } = require("../../repository/partRepository");
const { Service } = require("../Service");

const { memberService } = require("../member");

class PartService extends Service {
  constructor() {
    super({ repository: partRepository });
  }

  async findPartByRoomId(roomId) {
    const parts = await partRepository.selectAll({ roomId });
    const memberIds = parts.map((item) => item.memberId).filter((v) => v);

    const members = await memberService.findByIds(memberIds);
    parts.forEach((part) => {
      if (part.memberId) {
        part.member = members.find((member) => member.id === part.memberId);
      }
    });

    return parts;
  }

  updateMoveLocation({ data, roomId, location }) {
    const { prevX, prevY, nextX, nextY } = location;
    return partRepository.updateMoveLocation(roomId, prevX, prevY, nextX, nextY);
  }

  updateDeskMember({ memberId, roomId, locationX, locationY }) {
    return partRepository.updateMemberIdByLocation(memberId, roomId, { locationX, locationY });
  }

  updateEmptyDeskMember({ roomId, locationX, locationY }) {
    return partRepository.updateEmptyDeskByLocation(roomId, { locationX, locationY });
  }

  // TODO: transaction
  async updateChangeLocation({ roomId, location }) {
    const { prevX, prevY, nextX, nextY } = location;

    const prevPart = await partRepository.selectFirst({ roomId, locationX: prevX, locationY: prevY });
    await partRepository.updateMoveLocation(roomId, nextX, nextY, prevX, prevY);
    return partRepository.updateById(prevPart.id, { locationX: nextX, locationY: nextY });
  }

  deleteLocation({ roomId, location }) {
    console.log("roomId", roomId);
    console.log("location", location);
    const { x, y } = location;
    return partRepository.deleteByRoomIdAndLocationXAndLocationY(roomId, x, y);
  }
}

module.exports = {
  partService: new PartService(),
};
