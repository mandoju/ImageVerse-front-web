import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { RecentImagesPage } from '../pages/RecentImagesPage';
export const AppRouter = () => {
    return (
        <Switch>
            <Route path="/">
                <RecentImagesPage />
            </Route>
        </Switch>
    );
};
