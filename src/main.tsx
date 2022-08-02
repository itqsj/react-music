import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

import './index.css';
import '@/assets/css/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    // </React.StrictMode>,
);
