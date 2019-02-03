import axios from 'axios';

export const deleteComment = (id, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.delete(`/api/v1/comments/${id}`, config);
};

export const updateComment = () => {};

export const postComment = () => {};
