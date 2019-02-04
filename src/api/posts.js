import axios from 'axios';

export const postPost = (postForm, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post('/api/v1/posts', postForm, config);
};

export const deletePost = (id, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.delete(`/api/v1/posts/${id}`, config);
};

export const updatePost = (post, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.put(`/api/v1/posts/${post._id}`, post, config);
};
