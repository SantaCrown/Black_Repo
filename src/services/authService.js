import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const signup = (email, password) => axios.post(`${API_URL}/signup`, { email, password });

export const login = (email, password) => axios.post(`${API_URL}/login`, { email, password });
