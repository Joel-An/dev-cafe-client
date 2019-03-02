/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { host } from './config';

export const postImage = (image, token) => {
  const config = {
    headers: {
      'x-access-token': token,
      'Content-Type': `multipart/form-data; boundary=${image._boundary}`,
    },
  };

  return axios.post(`${host}/api/v1/images`, image, config);
};

export const getImage = () => {};
