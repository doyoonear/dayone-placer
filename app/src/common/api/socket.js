import socketio from 'socket.io-client';
import { SERVER_URL } from '../support/http-client';

export const socketConnection = socketio.connect(SERVER_URL);
