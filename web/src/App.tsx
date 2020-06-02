import React from 'react';
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react'
import Layout from './components/Layout/Layout'

import MapPage from './pages/MapPage/MapPage'
import SensorPage from './pages/SensorPage/SensorPage'

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1,
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2,
    },
  ],
}

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
            <Route exact path="/" component={MapPage} />
            <Route exact path="/sensor/:id" component={SensorPage} />
            <Redirect to="/"/>
        </Switch>
      </Layout>
    </Router>
  );
}

export default withAuthenticator(App, false, [], null, null, signUpConfig);
