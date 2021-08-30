const { SOCKET_EVENTS } = require("../../config/socket");

const { partService } = require("../service/part");

const subscribeChangeLocationEvent = (io, socket) => {
  socket.on(SOCKET_EVENTS.CHANGE_LOCATION, async (props) => {
    // if (!socket.accessToken) {
    //   return socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, { status: 401, message: "로그인이 필요합니다." });
    // }

    const { roomId } = props;

    await partService.updateChangeLocation(props);
    io.to(`room_${roomId}`).emit(SOCKET_EVENTS.CHANGE_LOCATION, props);
  });
};

module.exports = {
  subscribeChangeLocationEvent,
};
