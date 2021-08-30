const { SOCKET_EVENTS } = require("../../config/socket");

const { partService } = require("../service/part");

const subscribeAppendLocationEvent = (io, socket) => {
  socket.on(SOCKET_EVENTS.APPEND_LOCATION, async (props) => {
    // if (!socket.accessToken) {
    //   return socket.emit(SOCKET_EVENTS.APPEND_LOCATION, { status: 401, message: "로그인이 필요합니다." });
    // }

    const { data, roomId, location } = props;

    await partService.create({
      type: data.type,
      roomId: roomId,
      memberId: data.type === "MEMBER" ? data.id : undefined,
      locationX: location.x,
      locationY: location.y,
    });

    io.to(`room_${roomId}`).emit(SOCKET_EVENTS.APPEND_LOCATION, props);
  });
};

module.exports = {
  subscribeAppendLocationEvent,
};
