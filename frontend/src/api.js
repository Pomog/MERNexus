import axios from 'axios';
import {logout} from "./shared/utils/auth";

const apiClient = axios.create({
    baseURL: 'http://localhost:5002/api',
    timeout: 1000
});

const interceptorId = apiClient.interceptors.request.use((config) => {
   const userDetails =  localStorage.getItem('user');
   if (userDetails) {
       const parsedUser = JSON.parse(userDetails);
       if (parsedUser.token) {
           config.headers.Authorization = `Bearer ${parsedUser.token}`;
       }
   }

   return config;
}, (err) => {
    return Promise.reject(err);
});

// public

export const login = async (data) => {
    console.log("login");
    console.log(data);
    try {
        return await  apiClient.post('/auth/login', data);
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
};

export const register = async (data) => {
    try {
        return await  apiClient.post('/auth/register', data);
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
};

// secure

const checkResponseCode = (exception) => {
    const responseCode = exception?.response?.status;
     if (responseCode) {
         (responseCode === 401 || responseCode === 403) && logout();
     }
};
