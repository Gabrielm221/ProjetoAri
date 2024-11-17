import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5174', //URL do backend
});

//Adicionando token no header para autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;