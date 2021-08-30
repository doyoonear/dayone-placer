import { httpClient } from '../support/http-client';

export const findRoomParts = (roomId) => {
  return httpClient.get({ url: `/parts/rooms/${roomId}` });
};
