import axios from 'axios';
import { API_URL } from './urls';
import jsCookie from 'js-cookie'; 

const APIClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${jsCookie.get("token")}`,
  },
  withCredentials: true,
  
});

export const APIClientPrivate = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true
})

export default APIClient;

