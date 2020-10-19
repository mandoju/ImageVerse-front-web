import { Button, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../ducks';
import { getImages } from '../../ducks/image';

export const LoadMoreButton = ({ pageIndex }: { pageIndex: number }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const endReached = useSelector<ReduxState, boolean>((state) => state.image.endReached);
    if (endReached) {
        return null;
    }
    return (
        <Button
            variant="contained"
            color={'primary'}
            className={classes.button}
            onClick={() => dispatch(getImages({ pageIndex: pageIndex + 1 }))}
        >
            Load More
        </Button>
    );
};

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {
            flex: '1 0',
        },
    }),
);
