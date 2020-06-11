import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { GetSensors, GetSensorStatusColor } from '../api/Sensors';
import { onCreateSensorValues } from '../graphql/subscriptions';
import Icon from 'react-native-vector-icons/FontAwesome';

import settings from '../settings.json';

MapboxGL.setAccessToken(settings.mapboxApiAccessToken);

const MapScreen = ({ navigation }) => {
  
  const [sensors, setSensors] = useState([]);
  const [readyToSubscribe, setReadyToSubscribe] = useState(false);

  //fetch initial list of sensors and display current state
  useEffect(() => {

    const initSensors = async () => {
      
      console.log('fetching sensors');

      try {
        const response = await GetSensors();

        if (response) {
          setSensors(response);
          console.log('sensors retrived');
          setReadyToSubscribe(true);
        }
      }
      catch (error) {
        console.log('error fetching sensors', error);
      }
    };

    initSensors()

  }, []);

  //subscribe to changes in sensor values
  useEffect(() => {

    if (readyToSubscribe){

      console.log('start subscription to sensors');
      
      const subscriber = API.graphql(graphqlOperation(onCreateSensorValues)).subscribe({
        next: (response) => {

          //update the sensor's status in state
          if (response.value.data.onCreateSensorValues) {
            
            var newSensors = [...sensors];
        
            for (let item of newSensors) {
              if (item.sensorId === response.value.data.onCreateSensorValues.sensorId){
                item.status = response.value.data.onCreateSensorValues.status;
                break;
              }
            }

            setSensors(newSensors);
          }
        },
        error: (error) => {
          console.log('error on sensors subscription', error);
        }
      });

      return () => {
        console.log('terminating subscription to sensors');
        subscriber.unsubscribe();
      }
    }

  }, [readyToSubscribe]);

  return (

    <View style={styles.view}>

        <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Dark} >
        <MapboxGL.Camera
            zoomLevel={9.5}
            centerCoordinate={[-122.300000, 37.666743]}
        />

        {sensors.map((s) => {
            return (
                <MapboxGL.PointAnnotation 
                    id={s.sensorId}
                    key={s.sensorId}
                    coordinate={[s.geo.longitude, s.geo.latitude]}
                >
                    <Icon 
                        name="circle" 
                        size={15} 
                        color={GetSensorStatusColor(s.status)}
                        onPress={() => navigation.navigate('Sensor', {sensorId : s.sensorId})}
                    />
                </MapboxGL.PointAnnotation>
            )
            })}

        </MapboxGL.MapView>

      </View>
  );
};


const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

export default MapScreen;
