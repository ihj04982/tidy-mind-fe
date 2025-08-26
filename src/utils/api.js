import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_LOCAL_API_BASE_URL;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  } else {
    delete request.headers.Authorization;
  }
  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

// 공통 에러 메시지 추출
export function extractErrorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data?.error) return error.response.data.error;
  return error.message || '요청 처리 중 오류가 발생했습니다.';
}
