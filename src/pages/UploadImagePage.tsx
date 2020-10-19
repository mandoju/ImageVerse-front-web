import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useFormik } from 'formik';
import PublishIcon from '@material-ui/icons/Publish';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../ducks/image';
import { AppDispatch } from '../ducks';
import { useHistory } from 'react-router-dom';

interface UploadImageFormValues {
    title: string;
    file?: File;
    fileUrl: string;
}

export const UploadImagePage = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik<UploadImageFormValues>({
        initialValues: {
            title: '',
            file: undefined,
            fileUrl: '',
        },
        onSubmit: (values) => {
            const { title, file: image } = values;
            if (image) {
                dispatch(uploadImage({ title, image }))
                    .then(() => {
                        history.push('/');
                    })
                    .catch((error) => alert(error));
            }
        },
    });
    return (
        <div className={classes.page}>
            <Typography>Upload Image</Typography>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <TextField
                    id="title"
                    name="title"
                    label={'Title'}
                    variant={'outlined'}
                    className={classes.formItem}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <Button variant="contained" color={'primary'} component="label" className={classes.formItem}>
                    Select Image
                    <input
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(event) => {
                            if (event.currentTarget.files) {
                                formik.setFieldValue('fileUrl', URL.createObjectURL(event.currentTarget.files[0]));
                                return formik.setFieldValue('file', event.currentTarget.files[0]);
                            }
                            formik.setFieldValue('fileUrl', '');
                            return formik.setFieldValue('file', undefined);
                        }}
                    />
                </Button>
                <img
                    src={formik.values.fileUrl || ''}
                    alt={formik.values.title}
                    width={300}
                    className={classes.formItem}
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    type="submit"
                    startIcon={<PublishIcon />}
                    className={classes.formItem}
                    disabled={!formik.values.file || !formik.values.title}
                >
                    Upload
                </Button>
            </form>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    page: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    formItem: {
        margin: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));
