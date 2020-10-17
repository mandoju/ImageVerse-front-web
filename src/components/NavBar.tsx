import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

export const NavBar = () => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    ThingVerse
                </Typography>
                <Button variant={'contained'} color={'primary'}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};
