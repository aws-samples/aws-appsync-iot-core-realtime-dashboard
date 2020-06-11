import {AppRegistry} from 'react-native';
import Amplify from 'aws-amplify';

import App from './src/App';
import {name as appName} from './app.json';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
