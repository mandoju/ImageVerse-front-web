import React from 'react';
import { NavBar } from './NavBar';

export const PageContainer = ({ children }: { children: JSX.Element }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
};
