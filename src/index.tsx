import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';

import './assets/css/main.css';

import registerServiceWorker from './registerServiceWorker';

// export const Approuter
import  {AppRouter}  from './router'; 

// import  AppRouter  from './router';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
