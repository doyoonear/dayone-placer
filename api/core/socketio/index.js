/**
 * 기본 리턴되는 데이터 구조
 * {
 *   status: 200,
 *   message: '', // 200이 아닌 오류일 때
 *   data: [],
 * }
 */

const { SOCKET_EVENTS } = require('../../config/socket');
const { subscribeChangeLocationEvent } = require('./change-location');

class SocketService {
  constructor(io) {
    this.io = io;
    io.on('connection', this.onConnected);
  }

  onConnected(socket) {
    try {
      console.log('User is Connection! ' + socket.id);

      socket.on(SOCKET_EVENTS.INIT, (data) => {
        const accessToken = data.accessToken;
        socket.accessToken = accessToken;
      });

      // 현재 보고있는 roomId를 저장한다.s
      socket.on(SOCKET_EVENTS.ROOM_INIT, (data) => {
        socket.roomId = data.roomId;
      });

      subscribeChangeLocationEvent(socket);

      socket.on('connect_wait', (data) => {
        console.log('wait..');
        socket.emit('connect_wait', {});
      });

      socket.on('disconnect', () => {
        console.info('emit disconnect ! ' + socket.id);
        socket.disconnect();
      });

      socket.emit('connected');
    } catch (err) {
      console.error('socket err : ' + err);
    }
  };
}

module.exports = {
  SocketService,
};
