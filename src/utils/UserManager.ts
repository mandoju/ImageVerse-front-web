import Cookies from 'js-cookie';
import { API_URL, APP_DOMAIN } from '../constants/Constants';
import { getLoggedUser } from './Jwt';

export const refreshToken = async () => {
    const user = getLoggedUser();
    const res = await fetch(`${API_URL}auth/token`, {
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
    });
    const resJson = await res.json();
    if (resJson.jwt) Cookies.set('jwt', resJson.jwt, { domain: APP_DOMAIN });
};
