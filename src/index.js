import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Timer } from './Timer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Timer minutes={0} seconds={5} />, document.getElementById('root'));
registerServiceWorker();
 