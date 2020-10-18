import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageCardList } from '../components/Images/ImageCardList';
import { ReduxState } from '../ducks';
import { getImages } from '../ducks/image';
import { Image } from '../models/Image';

export const RecentImagesPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getImages({ pageIndex: 0 }));
    }, [dispatch]);
    const images = useSelector<ReduxState, Image[]>((state) => state.image.images);

    return (
        <div>
            <ImageCardList images={images} />
        </div>
    );
};
