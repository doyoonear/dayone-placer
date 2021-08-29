const { SOCKET_EVENTS } = require("../../config/socket");

const { partService } = require("../service/part");

const subscribeAppendLocationEvent = (socket) => {
  socket.on(SOCKET_EVENTS.APPEND_LOCATION, async (data) => {
    // if (!socket.accessToken) {
    //   return socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, { status: 401, message: "로그인이 필요합니다." });
    // }

    await partService.create({
      type: data.type,
      room_id: data.roomId,
      location_x: data.location.x,
      location_y: data.location.y,
    });

    socket.broadcast.emit(SOCKET_EVENTS.APPEND_LOCATION, data);
  });
};

module.exports = {
  subscribeAppendLocationEvent,
};
