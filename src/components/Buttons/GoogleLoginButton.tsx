import { Button } from '@material-ui/core';
import React from 'react';
import { API_URL } from '../../constants/Constants';

export const GoogleLoginButton = () => {
    return <Button onClick={() => window.open(`${API_URL}auth/google`, '_self')}>Google</Button>;
};
