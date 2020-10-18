import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_URL } from '../constants/Constants';
import { getLoggedUser } from './Jwt';

export const ApiConn = axios.create({ baseURL: API_URL, withCredentials: true });
ApiConn.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (err: AxiosError) => {
        return new Promise((resolve, reject) => {
            const originalReq = err.config;
            if (!err.response) {
                return Promise.reject(err);
            }
            const user = getLoggedUser();
            // @ts-ignore
            if (err.response.status === 401 && err.config && !err.config.__isRetryRequest && user) {
                // @ts-ignore
                originalReq._retry = true;

                let res = fetch(`${API_URL}auth/token`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'include',
                    redirect: 'follow',
                    referrer: 'no-referrer',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        //@ts-ignore
                        userId: user.data.id,
                    }),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        return axios(originalReq);
                    });

                resolve(res);
            }
            return Promise.reject(err);
        });
    },
);