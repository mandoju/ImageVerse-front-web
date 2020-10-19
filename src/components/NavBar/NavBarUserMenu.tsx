import {
    ClickAwayListener,
    Grow,
    IconButton,
    makeStyles,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography,
} from '@material-ui/core';
import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { User } from '../../models/User';
import { API_URL } from '../../constants/Constants';
import { ApiConn } from '../../utils/apiConn';
import { UploadImageButton } from '../Buttons/UploadImageButton';

export const NavBarUserMenu = ({ user }: { user: User }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <div>
            <UploadImageButton />
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
                ref={anchorRef}
            >
                <AccountCircle />
                <Typography className={classes.nameText}>{user.name}</Typography>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem
                                        onClick={async () => {
                                            await ApiConn.post(`./auth/token`, { userId: user.id });
                                            window.open(`${API_URL}auth/logout`, '_self');
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    nameText: {
        margin: theme.spacing(1),
    },
}));
