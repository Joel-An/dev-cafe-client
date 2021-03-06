import axios from 'axios';
import { host } from './config';

export const login = loginForm => axios
  .post(`${host}/api/v1/auth`, loginForm)
  .then((result) => {
    const { accessToken } = result.data;
    return accessToken;
  })
  .catch((err) => {
    throw err.response.data.message;
  });

export const testerLogin = () => axios
  .post(`${host}/api/v1/auth/tester`)
  .then((result) => {
    const { accessToken } = result.data;
    return accessToken;
  })
  .catch((err) => {
    throw err.response.data.message;
  });

export const logout = () => Promise.resolve();
// TODO: 백엔드에 로그아웃 구현이 안 돼있음.

export const fetchUserInfo = (token) => {
  const headers = {
    'x-access-token': token,
  };
  return axios.get(`${host}/api/v1/users/me`, { headers })
    .then(result => result.data.myInfo)
    .catch((err) => {
      throw err.data;
    });
};

export const fetchNewNotifications = (token) => {
  const headers = {
    'x-access-token': token,
  };
  return axios.get(`${host}/api/v1/users/me/new-notifications`, { headers })
    .then(result => result.data);
};

export const fetchOldNotifications = (token) => {
  const headers = {
    'x-access-token': token,
  };
  return axios.get(`${host}/api/v1/users/me/old-notifications`, { headers })
    .then(result => result.data);
};

export const fetchNotifCheckTime = (token) => {
  const headers = {
    'x-access-token': token,
  };
  return axios.get(`${host}/api/v1/users/me/notification-check-date`, { headers })
    .then(result => result.data.notificationCheckDate);
};

export const updateNotifCheckTime = (token) => {
  const headers = {
    'x-access-token': token,
  };
  return axios.put(`${host}/api/v1/users/me/notification-check-date`, null, { headers })
    .then(result => result.data);
};
