import socketio from 'socket.io-client';
import { SERVER_URL } from '../policy';

const socketConnection = socketio.connect(SERVER_URL);

export default socketConnection;
