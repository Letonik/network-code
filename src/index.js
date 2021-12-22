import './index.css';
import store from "./redux/redux-store";
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {/*BrowserRouter,*/ HashRouter} from "react-router-dom";
import {Provider} from "react-redux";


    ReactDOM.render(
        <HashRouter /*BrowserRouter*//* basename={process.env.PUBLIC_URL}*/>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>,
        document.getElementById('root')
    );


reportWebVitals();
