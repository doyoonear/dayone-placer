const { SOCKET_EVENTS } = require("../../config/socket");

const { partService } = require("../service/part");

const subscribeDeleteLocationEvent = (io, socket) => {
  socket.on(SOCKET_EVENTS.DELETE_LOCATION, async (props) => {
    // if (!socket.accessToken) {
    //   return socket.emit(SOCKET_EVENTS.DELETE_LOCATION, { status: 401, message: "로그인이 필요합니다." });
    // }

    const { data, roomId, location } = props;
    if (data.type === "MEMBER") {
      await partService.updateEmptyDeskMember({
        roomId,
        locationX: location.x,
        locationY: location.y,
      });

      props.data.type = "DESK";

      io.to(`room_${roomId}`).emit(SOCKET_EVENTS.APPEND_LOCATION, props);
    } else {
      await partService.deleteLocation(props);

      io.to(`room_${roomId}`).emit(SOCKET_EVENTS.DELETE_LOCATION, props);
    }
  });
};

module.exports = {
  subscribeDeleteLocationEvent,
};
