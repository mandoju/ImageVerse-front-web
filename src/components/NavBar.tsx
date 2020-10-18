import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { SITE_NAME } from '../constants/Constants';
import { GoogleLoginButton } from './Buttons/GoogleLoginButton';
import { UploadImageButton } from './Buttons/UploadImageButton';
export const NavBar = () => {
    const classes = useStyles();
    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.title}>
                    {SITE_NAME}
                </Typography>
                <UploadImageButton />
                <GoogleLoginButton />
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
