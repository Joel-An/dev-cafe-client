import axios from 'axios';

export const login = loginForm => axios
  .post('/api/v1/auth', loginForm)
  .then((result) => {
    const { accessToken } = result.data;
    return accessToken;
  })
  .catch((err) => {
    throw err.data;
  });

export const logout = () => Promise.resolve();
// TODO: 백엔드에 로그아웃 구현이 안 돼있음.

export const storeToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearToken = () => {
  localStorage.removeItem('token');
};
