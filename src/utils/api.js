import axios from 'axios';

export const LOCAL_BACKEND = import.meta.env.VITE_LOCAL_BACKEND;
//const PROD_BACKEND = `${import.meta.env.VITE_APP_PROD_BACKEND}/api`;
//const BACKEND_PROXY = `${import.meta.env.VITE_APP_BACKEND_PROXY}/api`;

const api = axios.create({
  baseURL: LOCAL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});

api.interceptors.request.use(
  (request) => {
    request.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`;
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data.error || error.response.data.message || error.message;
    return Promise.reject(error);
  },
);

export default api;
