// src/utils/axiosInstance.js
import axios from 'axios';
const authToken = 'YWRtaW46YWRtaW4=';
// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  // baseURL: 'https://blacklemon.app/api',  // Replace with your API base URL
  baseURL: 'http://localhost:5000/api',  // Replace with your API base URL
  'accept': 'application/json',         // Accept header for JSON response
  'Authorization': `Basic ${authToken}`  
});

// Add a request interceptor to add Authorization token (if required)
axiosInstance.interceptors.request.use(
  (config) => {
   

      config.headers['Authorization'] =  `Basic ${authToken}` 
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Optionally redirect to login or logout
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
