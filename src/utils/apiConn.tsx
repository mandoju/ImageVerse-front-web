import axios from 'axios';
import { API_URL } from '../constants/Constants';

export const apiConn = axios.create({ baseURL: API_URL });
