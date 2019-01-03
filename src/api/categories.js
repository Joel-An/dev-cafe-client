import axios from 'axios';

export const getCategories = () => axios.get('api/v1/categories');

export const postCategory = (category, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post('/api/v1/categories', category, config);
};
