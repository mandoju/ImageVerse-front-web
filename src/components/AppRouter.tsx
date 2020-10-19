import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RecentImagesPage } from '../pages/RecentImagesPage';
import { UploadImagePage } from '../pages/UploadImagePage';

export const AppRouter = () => {
    return (
        <Switch>
            <Route path="/upload">
                <UploadImagePage />
            </Route>
            <Route path="/">
                <RecentImagesPage />
            </Route>
        </Switch>
    );
};
