import { createStyles, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadMoreButton } from '../components/Buttons/LoadMoreButton';
import { ImageCardList } from '../components/Images/ImageCardList';
import { ReduxState } from '../ducks';
import { getImages } from '../ducks/image';
import { Image } from '../models/Image';

export const RecentImagesPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const images = useSelector<ReduxState, Image[]>((state) => state.image.images);
    const pageIndex = useSelector<ReduxState, number>((state) => state.image.pageIndex);

    useEffect(() => {
        dispatch(getImages({ pageIndex: 0 }));
    }, [dispatch]);
    return (
        <div>
            <ImageCardList images={images} />
            <div className={classes.footerContainer}>
                <div className={classes.buttonContainer}>
                    <LoadMoreButton pageIndex={pageIndex} />
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) =>
    createStyles({
        footerContainer: {
            display: 'flex',
            justifyContent: 'center',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            width: '50%',
        },
    }),
);
