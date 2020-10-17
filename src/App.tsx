import React from 'react';
import './App.css';
import { RecentImagesPage } from './pages/RecentImagesPage';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { PageContainer } from './components/PageContainer';

function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <PageContainer>
                    <RecentImagesPage />
                </PageContainer>
            </BrowserRouter>
        </>
    );
}

export default App;
