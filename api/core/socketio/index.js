const memberService = require('../component/member');
const roomService = require('../component/room');

const onConnected = (socket) => {
  try {
    console.log('User is Connection! ' + socket.id);

    socket.on('init', (data) => {
      console.log('init data', data);
      socket.memberId = data.memberId;
    });

    socket.on('connect_wait', (data) => {
      console.log('wait..');
      socket.emit('connect_wait', {});
    });

    socket.on('getRoom', ({ roomId } = {}) => {
      console.log('caller', socket.memberId);
      const data = roomService.getRoom();
      socket.emit('getRoom', data);
    });

    socket.on('changeRoomDesk', (props) => {
      // const members = memberService.findRoomMembers();
      socket.emit('changeRoomDesk', { brod: 'cast' });
      socket.broadcast.emit('changeRoomDesk', { brod: 'cast' });
    });

    socket.on('disconnect', () => {
      console.log('emit disconnect ! ' + socket.id);
      socket.disconnect();
    });

    socket.emit('connected');
  } catch (err) {
    console.error('socket err : ' + err);
  }
};

module.exports = {
  onConnected,
}
