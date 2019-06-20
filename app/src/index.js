import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/App';

// TODO: Should probably reenable this in the future, unnecessary for now
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

// TODO: This imports a _lot_ of stuff, either figure out removal of unused CSS
// 		 or narrow this down to just what is required.
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<App/>, document.getElementById('root'));
