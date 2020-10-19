import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeImage } from '../../ducks/image';
import { Image } from '../../models/Image';
import { ImageCard } from './ImageCard';
import { ImageModal } from './ImageModal';

interface ImageCardListProps {
    images: Image[];
}

export const ImageCardList = ({ images }: ImageCardListProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openImage, setOpenImage] = useState<Image | undefined>();

    return (
        <div className={classes.container}>
            <ImageModal
                image={openImage}
                handleClose={() => {
                    setOpenImage(undefined);
                }}
            />
            {images.map((image) => {
                return (
                    <div className={classes.childContainer} key={image.id}>
                        <ImageCard
                            key={image.id}
                            title={image.title}
                            creator={image.User.name}
                            imageUrl={image.url}
                            creationDate={image.createdAt}
                            likeCount={image.likesCount}
                            dislikeCount={image.dislikesCount}
                            likePress={async () => {
                                try {
                                    if (image.liked) {
                                        return await dispatch(likeImage({ image, type: 'remove' }));
                                    }
                                    return await dispatch(likeImage({ image, type: 'like' }));
                                } catch (err) {
                                    if (err === 'unauthorized') alert(err);
                                }
                            }}
                            dislikePress={async () => {
                                try {
                                    if (image.disliked) {
                                        return await dispatch(likeImage({ image, type: 'remove' }));
                                    }
                                    return await dispatch(likeImage({ image, type: 'dislike' }));
                                } catch (err) {
                                    if (err === 'unauthorized') alert(err);
                                }
                            }}
                            onImagePress={() => {
                                setOpenImage(image);
                            }}
                            liked={image.liked}
                            disliked={image.disliked}
                        />
                    </div>
                );
            })}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(4),
    },
    childContainer: {
        display: 'flex',
        flex: '1 0' /* explanation below */,
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5,
    },
}));
