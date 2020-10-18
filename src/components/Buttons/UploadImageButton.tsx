import React, { useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import { Button, makeStyles, Modal, TextField, Typography } from '@material-ui/core';

export const UploadImageButton = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<PublishIcon onClick={() => setOpen(true)} />}
            >
                Upload
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <form noValidate autoComplete="off">
                        <Typography>Upload Image</Typography>
                        <TextField id="title" label="Title" variant="outlined" size={'medium'} />
                    </form>
                </div>
            </Modal>
        </>
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
