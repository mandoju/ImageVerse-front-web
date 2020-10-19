import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

export const LoginPage = ({ location }: { location: Location }) => {
    const history = useHistory();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const jwtString = params.get('jwt'); // bar
        const refreshToken = params.get('refreshToken');
        if (jwtString && refreshToken) {
            Cookies.set('jwt', JSON.parse(jwtString));
            Cookies.set('refreshToken', refreshToken);
        } else {
            console.log('Missing Token');
        }
        history.push('/');
    }, []);
    return <div />;
};
