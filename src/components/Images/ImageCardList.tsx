import React from 'react';
import { useDispatch } from 'react-redux';
import { likeImage } from '../../ducks/image';
import { Image } from '../../models/Image';
import { ImageCard } from './ImageCard';

interface ImageCardListProps {
    images: Image[];
}

export const ImageCardList = ({ images }: ImageCardListProps) => {
    const dispatch = useDispatch();

    return (
        <div>
            {images.map((image) => {
                return (
                    <ImageCard
                        key={image.id}
                        title={image.title}
                        imageUrl={image.url}
                        creationDate={image.creationDate}
                        likeCount={image.likesCount}
                        dislikeCount={image.dislikesCount}
                        likePress={async () => {
                            try {
                                await dispatch(likeImage({ image, type: 'like' }));
                            } catch (err) {
                                if (err === 'unauthorized') alert(err);
                            }
                        }}
                        dislikePress={() => dispatch(likeImage({ image, type: 'dislike' }))}
                    />
                );
            })}
        </div>
    );
};