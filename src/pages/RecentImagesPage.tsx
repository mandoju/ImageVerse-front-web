import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ImageCard } from '../components/Images/ImageCard';
import { getImages } from '../ducks/image';

export const RecentImagesPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getImages({ pageIndex: 0 }));
    }, []);
    return (
        <div>
            <ImageCard
                title={'titulo'}
                imageUrl={
                    'https://s3.us-east-2.amazonaws.com/imageverse-images.jorgerama.com.br/b8a86220-10b5-11eb-84bc-297d370707a4-cartaodosus2017-2.jpg'
                }
                creationDate={'data'}
                likeCount={120}
                dislikeCount={240}
            />
        </div>
    );
};
