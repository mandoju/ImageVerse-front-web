import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { SITE_NAME } from '../constants/Constants';
import { UploadImageButton } from './Buttons/UploadImageButton';
import { Link } from 'react-router-dom';
import { NavBarUserInfo } from './NavBar/NavBarUserInfo';
export const NavBar = () => {
    const classes = useStyles();
    return (
        <AppBar position="relative">
            <Toolbar>
                <Link to={'/'} className={classes.title}>
                    <Typography variant="h6" color="inherit">
                        {SITE_NAME}
                    </Typography>
                </Link>
                <NavBarUserInfo />
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
        color: theme.palette.getContrastText(theme.palette.primary.light),
        textDecoration: 'none',
    },
}));
