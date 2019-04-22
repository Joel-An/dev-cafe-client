import axios from 'axios';
import { host } from './config';

export const deleteComment = (id, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.delete(`${host}/api/v1/comments/${id}`, config);
};

export const updateComment = (comment, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.put(`${host}/api/v1/comments/${comment._id}`, comment, config);
};

export const postComment = (comment, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post(`${host}/api/v1/comments`, comment, config);
};

export const postAuthorHeart = (commentId, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post(`${host}/api/v1/comments/${commentId}/heart`, null, config);
};

export const deleteAuthorHeart = (commentId, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.delete(`${host}/api/v1/comments/${commentId}/heart`, config);
};

