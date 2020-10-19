import {
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    createStyles,
    makeStyles,
    Theme,
    Slide,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import React, { ImgHTMLAttributes, useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ClockIcon from '@material-ui/icons/AccessTime';
import { Image } from '../../models/Image';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ImageSizeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import moment from 'moment';
import useWindowDimensions from '../../hooks/useWindowDimensions';
interface ImageModalProps {
    image?: Image;
    handleClose: () => void;
}

export const ImageModal = ({ image, handleClose }: ImageModalProps) => {
    const classes = useStyles();
    const { height } = useWindowDimensions();
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeigth] = useState(0);
    const imgElement = React.useRef<HTMLImageElement>(null);

    return (
        <Dialog maxWidth={'lg'} open={!!image} onClose={handleClose} TransitionComponent={Transition}>
            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {image?.title}
                        </Typography>
                    </Toolbar>
                    <Toolbar>
                        <div className={classes.iconTextContainer}>
                            <ClockIcon />
                            <Typography className={classes.userNameText}>
                                {image && moment(image.createdAt).format('MM/DD/YYYY')}
                            </Typography>
                        </div>
                        <div className={classes.iconTextContainer}>
                            <AccountCircle />
                            <Typography className={classes.userNameText}>{image?.User.name}</Typography>
                        </div>
                        <div className={classes.iconTextContainer}>
                            <ImageSizeIcon />
                            <Typography className={classes.userNameText}>
                                {imageWidth}x{imageHeight}
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.imageContainer}>
                    <img
                        alt={image?.title}
                        src={image?.url}
                        width={'auto'}
                        height={'auto'}
                        ref={imgElement}
                        style={{ maxHeight: height - 200, maxWidth: '100%' }}
                        onLoad={() => {
                            const loadImg = imgElement;
                            if (loadImg && loadImg.current) {
                                setImageWidth(loadImg.current.naturalWidth);
                                setImageHeigth(loadImg.current.naturalHeight);
                            }
                        }}
                    />
                </div>
            </div>
        </Dialog>
    );
};
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        iconTextContainer: {
            display: 'flex',
            alignItems: 'center',
            marginRight: theme.spacing(2),
        },
        userNameText: {
            margin: theme.spacing(1),
        },
        imageContainer: {
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
        },
    }),
);
