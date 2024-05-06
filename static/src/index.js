// index.js
import App from './components/App';
import { createRoot } from 'react-dom/client';

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<App tab="home" />);
}
);

