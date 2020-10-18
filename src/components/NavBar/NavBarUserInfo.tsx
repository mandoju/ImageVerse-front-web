import React, { useEffect, useState } from 'react';
import { User } from '../../models/User';
import { getLoggedUser } from '../../utils/Jwt';
import { GoogleLoginButton } from '../Buttons/GoogleLoginButton';
import { NavBarUserMenu } from './NavBarUserMenu';

export const NavBarUserInfo = () => {
    const [user, setUser] = useState<User | undefined>();
    useEffect(() => {
        const loggedUser = getLoggedUser();
        if (loggedUser) {
            setUser(loggedUser.data);
        }
    }, []);
    if (user) {
        return <NavBarUserMenu user={user} />;
    }
    return <GoogleLoginButton />;
};
