import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constants/Constants';
import { getLoggedUser } from '../../utils/Jwt';

export const GoogleLoginButton = () => {
    return (
        <Button color={'secondary'} variant={'contained'} onClick={() => window.open(`${API_URL}auth/google`, '_self')}>
            Login Google
        </Button>
    );
};
