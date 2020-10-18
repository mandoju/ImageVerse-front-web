import { Button } from '@material-ui/core';
import React from 'react';
import { API_URL } from '../../constants/Constants';
import CommonColors from '@material-ui/core/colors/common';

export const GoogleLoginButton = () => {
    return (
        <Button color={'secondary'} onClick={() => window.open(`${API_URL}auth/google`, '_self')}>
            Google
        </Button>
    );
};
