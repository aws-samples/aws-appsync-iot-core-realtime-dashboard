import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify} from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import MapPage from './MapPage'

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const App = () => {

  return (
    <MapPage />
  );
}

export default withAuthenticator(App);
