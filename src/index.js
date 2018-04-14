// React and Redux imports:
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux'

// Others:
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import allReducers from './reducers/reducer'

const store = createStore(allReducers);
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
