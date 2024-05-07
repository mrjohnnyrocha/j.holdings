// index.js
import App from './components/App';
import React from 'react'; // This is required in files using JSX
import { createRoot } from 'react-dom/client';

require('dotenv').config();

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<App tab="home" />);
}
);

