import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { User } from '../models/User';

export const getLoggedUser = (): { data: User } | undefined => {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
        const user = jwt<{ data: User }>(jwtCookie);
        return user;
    }
    return undefined;
};
