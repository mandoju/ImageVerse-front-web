import React from 'react';
import './App.css';
import { RecentImagesPage } from './pages/RecentImagesPage';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { PageContainer } from './components/PageContainer';
import configureStore from './utils/ConfigureStore';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <CssBaseline />
            <BrowserRouter>
                <PageContainer>
                    <RecentImagesPage />
                </PageContainer>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
