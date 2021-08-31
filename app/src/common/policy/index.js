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
  { id: 1, type: 'DESK', title: '공석', color: 'lightpink' },
  { id: 2, type: 'WINDOW_1', title: '창문', color: 'lightblue' },
  { id: 3, type: 'DOOR', title: '출입문', color: '#F6C242' },
  { id: 4, type: 'BOOK_SHELVES', title: '책장', color: '#FDF2D0' },
  { id: 5, type: 'PRINTER', title: '프린터', color: '#E6D2DC' },
  { id: 6, type: 'WAY', title: '통로', color: 'yellow' },
];

export const ACCOUNT_PERMISSION = {
  ALL: 100,
  NONE: 0,
};

// export const SERVER_URL = 'http://localhost:4000';
export const SERVER_URL = 'http://ky-server.iptime.org:4000';
