import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default apiClient;


export function getApiErrorMessage(error, fallbackMessage = 'Request failed. Please try again.') {
  const responseData = error.response?.data;

  if (typeof responseData === 'string') {
    return responseData;
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.error) {
    return responseData.error;
  }

  if (responseData?.errors) {
    if (Array.isArray(responseData.errors)) {
      return responseData.errors.join(', ');
    }

    if (typeof responseData.errors === 'object') {
      return Object.values(responseData.errors).flat().join(', ');
    }
  }

  if (error.message === 'Network Error') {
    return 'Cannot reach the backend API. Please confirm the backend is running and CORS is configured.';
  }

  return error.message || fallbackMessage;
}
