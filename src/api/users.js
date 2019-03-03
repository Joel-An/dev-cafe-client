import axios from 'axios';
import { host } from './config';

export const register = registerForm => axios
  .post(`${host}/api/v1/users`, registerForm);

export const unregister = () => Promise.resolve();
