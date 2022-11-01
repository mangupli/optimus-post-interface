import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './components/app/App';
import { MapProvider } from './contexts/MapContext';

import store from './store/index';

/* import './index.css'; */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <MapProvider>
            <App />
        </MapProvider>
    </Provider>   
);


