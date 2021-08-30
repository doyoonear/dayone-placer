import httpClient from '../support/http-client';

export const findGroups = () => {
  return httpClient.get({ url: `/groups` });
};

export const findGroupMembers = () => {
  return httpClient.get({ url: `/groups/members` });
};
