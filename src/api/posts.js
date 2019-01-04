import axios from 'axios';


export const postPost = (postForm, token) => {
  const config = { headers: { 'x-access-token': token } };

  return axios.post('/api/v1/posts', postForm, config);
};
