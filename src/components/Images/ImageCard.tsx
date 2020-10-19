import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TrashIcon from '@material-ui/icons/DeleteForever';
import moment from 'moment';

interface ImageCardProps {
    title: string;
    creator: string;
    imageUrl: string;
    creationDate: string;
    onImagePress?: () => void;
    likeCount: number;
    dislikeCount: number;
    likePress?: () => void;
    dislikePress?: () => void;
    liked?: boolean;
    disliked?: boolean;
    deletePress?: () => void;
}

const buttonColor = (value?: boolean) => (value ? 'primary' : 'inherit');

export const ImageCard = ({
    title,
    creator,
    imageUrl,
    creationDate,
    onImagePress,
    likeCount,
    dislikeCount,
    likePress,
    dislikePress,
    liked,
    disliked,
    deletePress,
}: ImageCardProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    title={title}
                    subheader={
                        <>
                            <Typography>{creator}</Typography>
                            <Typography>{moment(creationDate).format('MM/DD/YYYY')}</Typography>
                        </>
                    }
                />
                <CardMedia className={classes.media} image={imageUrl} title="Image title" onClick={onImagePress} />
                <CardActions disableSpacing>
                    <div className={classes.startIcons}>
                        <IconButton aria-label="like" color={buttonColor(liked)} onClick={likePress}>
                            <ThumbUpIcon />
                        </IconButton>
                        <Typography variant="subtitle1" color="inherit" noWrap>
                            {likeCount}
                        </Typography>
                        <IconButton aria-label="dislike" color={buttonColor(disliked)} onClick={dislikePress}>
                            <ThumbDownIcon />
                        </IconButton>
                        <Typography variant="subtitle1" color="inherit" noWrap>
                            {dislikeCount}
                        </Typography>
                    </div>
                    {deletePress ? (
                        <IconButton aria-label="delete" color={'secondary'} onClick={deletePress}>
                            <TrashIcon />
                        </IconButton>
                    ) : null}
                </CardActions>
            </Card>
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
    startIcons: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
}));
