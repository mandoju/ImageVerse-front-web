import React from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const UploadImageButton = () => {
    const classes = useStyles();
    return (
        <Link to={'/upload'}>
            <Button variant="contained" color="primary" className={classes.button} startIcon={<PublishIcon />}>
                Upload
            </Button>
        </Link>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    button: {
        margin: theme.spacing(1),
    },
}));
