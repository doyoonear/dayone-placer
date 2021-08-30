import axios from 'axios';
import { getStorage } from './storage';
import { SERVER_URL } from '../policy';

const api = axios.create({
  baseURL: SERVER_URL,
});

const setAccessToken = () => {
  const accessToken = getStorage('ACCESS_TOKEN');
  if (accessToken) {
    api.defaults.headers.Authorization = `${accessToken}`;
  } else {
    delete api.defaults.headers.Authorization;
  }
};

const httpClient = {
  async get({ url, params, responseType }) {
    setAccessToken();
    return api({
      method: 'GET',
      url,
      params,
      responseType,
    });
  },
  async post({ url, headers, data }) {
    setAccessToken();
    return api({
      method: 'POST',
      headers,
      url,
      data,
    });
  },
  async delete({ url, data }) {
    setAccessToken();
    return api({
      method: 'DELETE',
      url,
      data,
    });
  },
  async put({ url, data }) {
    setAccessToken();
    return api({
      method: 'PUT',
      url,
      data,
    });
  },
};

export default httpClient;
