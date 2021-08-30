import httpClient from '../support/http-client';

export const findRooms = () => {
  return httpClient.get({ url: `/rooms` });
};

export const createRoom = (data) => {
  return httpClient.post({ url: '/rooms', data });
};

export const apiDeleteRoom = (id) => {
  return httpClient.delete({ url: `/rooms/${id}` });
};
