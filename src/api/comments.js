import axios from 'axios';

export const deleteComment = (id, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.delete(`/api/v1/comments/${id}`, config);
};

export const updateComment = (comment, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.put(`/api/v1/comments/${comment._id}`, comment, config);
};

export const postComment = (comment, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post('/api/v1/comments', comment, config);
};
