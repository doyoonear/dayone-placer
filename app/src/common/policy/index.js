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
  { id: 1, type: 'DESK', title: '책상', color: '#fadeb1' },
  { id: 2, type: 'WINDOW_1', title: '창문', color: '#e6f5f7' },
  { id: 3, type: 'DOOR', title: '출입문', color: '#bcc7eb' },
  { id: 4, type: 'WALL', title: '벽', color: '#f7f1e9' },
  { id: 5, type: 'PLANT', title: '화분', color: '#e3f0bd' },
  { id: 6, type: 'PRINTER', title: '프린터', color: '#B1B5C8' },
  { id: 7, type: 'WAY', title: '통로', color: '#707070' },
];

export const ACCOUNT_PERMISSION = {
  ALL: 100,
  NONE: 0,
};

// export const SERVER_URL = 'http://localhost:4000';
export const SERVER_URL = 'http://ky-server.iptime.org:4000';
