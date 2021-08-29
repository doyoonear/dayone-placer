const { SOCKET_EVENTS } = require("../../config/socket");

const { partService } = require("../service/part");

const subscribeAppendLocationEvent = (socket) => {
  socket.on(SOCKET_EVENTS.APPEND_LOCATION, async (data) => {
    // if (!socket.accessToken) {
    //   return socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, { status: 401, message: "로그인이 필요합니다." });
    // }

    console.log("data", data);
    await partService.create({
      type: data.type,
      room_id: data.roomId,
      location_x: data.location.nextX,
      location_y: data.location.nextY,
    });

    // const members = memberService.findRoomMembers();
    socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, { brod: "cast" });
    socket.broadcast.emit(SOCKET_EVENTS.CHANGE_LOCATION, { brod: "cast" });
  });
};

module.exports = {
  subscribeAppendLocationEvent,
};
