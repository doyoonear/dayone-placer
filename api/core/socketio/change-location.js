const { SOCKET_EVENTS } = require('../../config/socket');

const subscribeChangeLocationEvent = (socket) => {
  socket.on(SOCKET_EVENTS.CHANGE_LOCATION, (props) => {
    if (!socket.accessToken) {
      return socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, { status: 401, message: '로그인이 필요합니다.' });
    }

    // const members = memberService.findRoomMembers();
    socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, { brod: 'cast' });
    socket.broadcast.emit(SOCKET_EVENTS.CHANGE_LOCATION, { brod: 'cast' });
  });
};

module.exports = {
  subscribeChangeLocationEvent,
}
