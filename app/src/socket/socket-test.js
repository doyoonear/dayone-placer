import React, { useEffect } from 'react';
import socketio from 'socket.io-client';

const socket = socketio.connect('http://localhost:4000');

// 공통 관리해야할 값
const SOCKET_EVENTS = {
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  APPEND_LOCATION: 'APPEND_LOCATION',
  REMOVE_LOCATION: 'REMOVE_LOCATION',
  INIT: 'INIT',
};

const socketInit = () => {
  socket.emit(SOCKET_EVENTS.INIT, { memberId: 3, accessToken : 'test' });
};

const changeLocation = (type) => {
  socket.emit(SOCKET_EVENTS.CHANGE_LOCATION, {
    roomId: 1,
    type,
    prevLocation: { x: 3, y: 5 },
    nextLocation: { x: 5, y: 5 },
  });
};

const appendLocation = (type) => {
  socket.emit(SOCKET_EVENTS.APPEND_LOCATION, { roomId: 1, type, location: { x: 5, y: 5 } });
};

const removeLocation = (type) => {
  socket.emit(SOCKET_EVENTS.REMOVE_LOCATION, { roomId: 1, type, location: { x: 5, y: 5 } });
};

const SocketTest = () => {
  useEffect(() => {
    socketInit();
    subscribeSocketEvents();
  }, []);

  const subscribeSocketEvents = () => {
    socket.on('connected', () => {
      console.log('connected');
    });

    socket.on(SOCKET_EVENTS.CHANGE_LOCATION, (data) => {
      // data를 사용하여 데이터를 바꿔줘야함
      console.log(SOCKET_EVENTS.CHANGE_LOCATION, data);
    });
  };

  return (
    <div>
      <button onClick={() => changeLocation('DESK')}>changeDesk</button>
      <button onClick={() => appendLocation('DESK')}>appendDesk</button>
      <button onClick={() => removeLocation('DESK')}>removeDesk</button>
    </div>
  );
};

export default SocketTest;
