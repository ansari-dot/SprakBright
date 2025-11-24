// src/services/auth.js
import { toast } from 'react-hot-toast';
import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/user/login', { email, password });
    if (response.data?.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }
    throw new Error(response.data?.message || 'Login failed. Please try again.');
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};

export const logout = async () => {
  try {
    await api.post('/user/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};