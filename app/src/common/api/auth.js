import httpClient from '../support/http-client';

const authSignIn = (data) => {
  return httpClient.post({
    url: '/auth/sign-in',
    data,
  });
};

export default authSignIn;
