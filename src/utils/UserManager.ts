import { API_URL } from '../constants/Constants';
import { getLoggedUser } from './Jwt';

export const refreshToken = async () => {
    const user = getLoggedUser();
    await fetch(`${API_URL}auth/token`, {
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
};
