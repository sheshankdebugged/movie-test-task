import axios from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = 'https://test.debugged-pro.com/backend'

export const instance = axios.create({
    baseURL: baseUrl,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = Cookies.get('token');
    if(token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
