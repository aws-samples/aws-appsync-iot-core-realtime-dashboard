import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Layout from './components/Layout'
import Routes from './Routes'

import { withAuthenticator } from '@aws-amplify/ui-react';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

export default withAuthenticator(App);
