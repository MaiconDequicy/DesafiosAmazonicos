import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { setup } from '@twind/core';
import config from './twind.config';
import { tw } from '@twind/react';

setup(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tw={tw} />
  </React.StrictMode>
);

reportWebVitals();