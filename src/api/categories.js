import axios from 'axios';
import { host } from './config';

export const getCategories = () => axios.get(`${host}/api/v1/categories`);

export const postCategory = (category, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post(`${host}/api/v1/categories`, category, config);
};

export const deleteCategory = (id, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.delete(`${host}/api/v1/categories/${id}`, config);
};

export const getCategory = id => axios.get(`${host}/api/v1/categories/${id}`)
  .then(response => response.data)
  .catch(err => err.message);
