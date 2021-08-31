export const SOCKET_EVENT_TYPE = {
  APPEND_LOCATION: 'APPEND_LOCATION',
  DELETE_LOCATION: 'DELETE_LOCATION',
  MOVE_LOCATION: 'MOVE_LOCATION',
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  ROOM_JOIN: 'ROOM_JOIN',
  ROOM_LEAVE: 'ROOM_LEAVE',
  INIT: 'INIT',
};

export const DEFAULT_PART_LIST = [
  { id: 1, type: 'DESK', title: '책상', color: 'lightpink' },
  { id: 2, type: 'WINDOW_1', title: '창문', color: 'lightblue' },
];

// export const SERVER_URL = 'http://localhost:4000';
export const SERVER_URL = 'http://ky-server.iptime.org:4000';
