import React, {useEffect} from 'react';
import socketio from 'socket.io-client';

const socket = socketio.connect('http://localhost:4000');

const getRoom = () => {
    socket.emit('getRoom');
}

const loadRoom = () => {
    socket.emit('loadRoom');
}

const socketInit = () => {
    socket.emit('init', {memberId: 3});
}

const changeRoomDesk = () => {
    socket.emit('changeRoomDesk', {prev: {x: 3, y: 5}, next: {x: 5, y: 5}});
}

const SocketTest = () => {
    useEffect(() => {
        subscribeSocketEvents();
    }, []);

    const subscribeSocketEvents = () => {
        socket.on('connected', () => {
            console.log('connected')
        });

        socket.on('getRoom', (msg) => {
            console.log('getRoom', msg);
        });

        socket.on('changeRoomDesk', (msg) => {
            console.log('changeRoomDesk', msg);
        });
    }

    return (
        <div>
            <button onClick={getRoom}>getRoom</button>
            <button onClick={changeRoomDesk}>changeRoomDesk</button>
            <button onClick={socketInit}>socketInit</button>
        </div>
    )
}

export default SocketTest;
