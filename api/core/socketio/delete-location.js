const { SOCKET_EVENTS } = require("../../config/socket");

const { partService } = require("../service/part");

const subscribeDeleteLocationEvent = (socket) => {
  socket.on(SOCKET_EVENTS.CHANGE_LOCATION, async (data) => {
    console.log("ddd");
    // if (!socket.accessToken) {
    //   return socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, { status: 401, message: "로그인이 필요합니다." });
    // }

    console.log("data", data);
    await partService.deleteLocation(data);

    // const members = memberService.findRoomMembers();
    socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, { brod: "cast" });
    socket.broadcast.emit(SOCKET_EVENTS.CHANGE_LOCATION, { brod: "cast" });
  });
};

module.exports = {
  subscribeDeleteLocationEvent,
};
