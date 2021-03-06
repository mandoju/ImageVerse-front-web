import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { PageContainer } from './components/PageContainer';
import configureStore from './utils/ConfigureStore';
import { Provider } from 'react-redux';
import { AppRouter } from './components/AppRouter';

const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <CssBaseline />
            <BrowserRouter>
                <PageContainer>
                    <AppRouter />
                </PageContainer>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
