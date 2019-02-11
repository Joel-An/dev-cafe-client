import axios from 'axios';

export const login = loginForm => axios
  .post('/api/v1/auth', loginForm)
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
  return axios.get('/api/v1/users/me', { headers })
    .then(result => result.data.myInfo)
    .catch((err) => {
      throw err.data;
    });
};
