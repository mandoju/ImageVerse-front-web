import axios from 'axios';
import { API_URL } from '../constants/Constants';

export const ApiConn = axios.create({ baseURL: API_URL, withCredentials: true });
