import React from 'react';
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

interface ImageCardProps {
    title: string;
    imageUrl: string;
    creationDate: string;
    likeCount: number;
    dislikeCount: number;
}

export const ImageCard = ({ title, imageUrl, creationDate, likeCount, dislikeCount }: ImageCardProps) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                title={title}
                subheader={creationDate}
            />
            <CardMedia className={classes.media} image={imageUrl} title="Image title" />
            <CardActions disableSpacing>
                <IconButton aria-label="like">
                    <ThumbUpIcon />
                </IconButton>
                <Typography variant="subtitle1" color="inherit" noWrap>
                    {likeCount}
                </Typography>
                <IconButton aria-label="dislike">
                    <ThumbDownIcon />
                </IconButton>
                <Typography variant="subtitle1" color="inherit" noWrap>
                    {dislikeCount}
                </Typography>
            </CardActions>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
