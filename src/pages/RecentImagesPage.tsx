import React from 'react';
import { ImageCard } from '../components/Images/ImageCard';

export const RecentImagesPage = () => {
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
