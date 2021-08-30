import { httpClient } from '../support/http-client';

export const authSignIn = (data) => {
  return httpClient.post({
    url: '/auth/sign-in',
    data,
  });
};
