import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
