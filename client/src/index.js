import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { GlobalProvider } from './components/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalProvider>
    <App />
    </GlobalProvider>
);
