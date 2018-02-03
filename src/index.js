import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as axiosConfig from './js/helpers/SetAxiosDefault'

import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import rootReducer from './js/reducers/index';
import { isLoggedIn, getTokenData } from './js/helpers/isLoggedIn';
import './css/App.css';

axiosConfig.setBaseUrl();
axiosConfig.setFormPostType();
axiosConfig.setRequestToken(localStorage.getItem('token'));



const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

if(isLoggedIn()) {
  store.dispatch({ type: 'SET_USER', data: getTokenData() });
}

ReactDOM.render(
    <Provider store={store} >
      <BrowserRouter>
        {Routes}
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();