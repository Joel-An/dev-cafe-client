import axios from 'axios';

export const getCategories = () => axios.get('api/v1/categories');

export const postCategory = (category, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post('/api/v1/categories', category, config);
};

export const deleteCategory = (id, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.delete(`/api/v1/categories/${id}`, config);
};

export const getCategory = id => axios.get(`api/v1/categories/${id}`)
  .then(response => response.data)
  .catch(err => err.message);
