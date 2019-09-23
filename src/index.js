import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// TODO: Is CSS tree shaking a thing by default?
import 'bootstrap/dist/css/bootstrap-reboot.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// TODO: Add service worker in production
