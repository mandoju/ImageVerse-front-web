import { makeStyles } from '@material-ui/core';
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
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {images.map((image) => {
                return (
                    <div className={classes.childContainer}>
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
