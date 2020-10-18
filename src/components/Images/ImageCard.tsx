import React, { useState } from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
//@ts-ignore
import { Lightbox } from 'react-modal-image';

interface ImageCardProps {
    title: string;
    imageUrl: string;
    creationDate: string;
    likeCount: number;
    dislikeCount: number;
    likePress?: () => void;
    dislikePress?: () => void;
}

export const ImageCard = ({
    title,
    imageUrl,
    creationDate,
    likeCount,
    dislikeCount,
    likePress,
    dislikePress,
}: ImageCardProps) => {
    const classes = useStyles();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    title={title}
                    subheader={creationDate}
                />
                <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title="Image title"
                    onClick={() => setIsModalOpen(true)}
                />
                <CardActions disableSpacing>
                    <IconButton aria-label="like" onClick={likePress}>
                        <ThumbUpIcon />
                    </IconButton>
                    <Typography variant="subtitle1" color="inherit" noWrap>
                        {likeCount}
                    </Typography>
                    <IconButton aria-label="dislike" onClick={dislikePress}>
                        <ThumbDownIcon />
                    </IconButton>
                    <Typography variant="subtitle1" color="inherit" noWrap>
                        {dislikeCount}
                    </Typography>
                </CardActions>
            </Card>
            {isModalOpen && <Lightbox large={imageUrl} alt={title} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        width: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        cursor: 'pointer',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
