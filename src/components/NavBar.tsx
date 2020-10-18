import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { SITE_NAME } from '../constants/Constants';
import { GoogleLoginButton } from './Buttons/GoogleLoginButton';

export const NavBar = () => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    {SITE_NAME}
                </Typography>
                <GoogleLoginButton />
            </Toolbar>
        </AppBar>
    );
};
