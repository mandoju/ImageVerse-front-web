import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { SITE_NAME } from '../constants/Constants';

export const NavBar = () => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    {SITE_NAME}
                </Typography>
                <Button variant={'contained'} color={'primary'}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};
