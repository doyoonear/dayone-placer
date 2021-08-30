const { SOCKET_EVENTS } = require("../../config/socket");

const { partService } = require("../service/part");

const subscribeDeleteLocationEvent = (io, socket) => {
  socket.on(SOCKET_EVENTS.DELETE_LOCATION, async (props) => {
    // if (!socket.accessToken) {
    //   return socket.emit(SOCKET_EVENTS.DELETE_LOCATION, { status: 401, message: "로그인이 필요합니다." });
    // }

    const { roomId } = props;

    await partService.deleteLocation(props);
    io.to(`room_${roomId}`).emit(SOCKET_EVENTS.DELETE_LOCATION, props);
  });
};

module.exports = {
  subscribeDeleteLocationEvent,
};
