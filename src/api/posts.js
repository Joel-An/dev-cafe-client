import axios from 'axios';
import { host } from './config';

export const postPost = (postForm, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post(`${host}/api/v1/posts`, postForm, config);
};

export const deletePost = (id, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.delete(`${host}/api/v1/posts/${id}`, config);
};

export const updatePost = (post, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.put(`${host}/api/v1/posts/${post._id}`, post, config);
};
