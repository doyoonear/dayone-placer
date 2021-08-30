import httpClient from '../support/http-client';

const findRoomParts = (roomId) => {
  return httpClient.get({ url: `/parts/rooms/${roomId}` });
};

export default findRoomParts;
