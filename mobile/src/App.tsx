import React from 'react';
import { StyleSheet } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';

import settings from './settings.json';

MapboxGL.setAccessToken(settings.mapboxApiAccessToken);

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
  map: {
    flex: 1
  }
});

export default withAuthenticator(App);
