import axios from 'axios';

export const getCategories = () => axios.get('api/v1/categories');
