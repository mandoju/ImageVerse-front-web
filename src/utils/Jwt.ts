import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

export const getLoggedUser = () => {
    const jwtCookie = Cookies.get('jwt');
    if (jwtCookie) {
        const user = jwt(jwtCookie);
        return user;
    }
    return undefined;
};
