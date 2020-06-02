import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import MapboxGL from '@react-native-mapbox-gl/maps';

Amplify.configure(awsconfig);

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

//TODO: put access token in a settings.json file
MapboxGL.setAccessToken("");


const App: React.FC = () => {
  return (

      <MapboxGL.MapView style={styles.map} >
        <MapboxGL.Camera
            zoomLevel={9}
            centerCoordinate={[-122.185435, 37.666743]}
          />
        </MapboxGL.MapView>

  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});

export default withAuthenticator(App);
