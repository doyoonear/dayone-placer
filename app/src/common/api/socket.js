import socketio from 'socket.io-client';
import { SERVER_URL } from '../policy';

export const socketConnection = socketio.connect(SERVER_URL);
