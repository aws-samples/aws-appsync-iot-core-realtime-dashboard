import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Amplify from 'aws-amplify'

import config from './aws-exports'
import theme from './theme';
import App from './App';

import * as serviceWorker from './serviceWorker';

//Amplify.Logger.LOG_LEVEL = "DEBUG";

Amplify.configure(config)

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
