import React, {useState,useEffect} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {View, StyleSheet} from 'react-native';
import StatusPanel from '../components/StatusPanel';
import ValuePanel from '../components/ValuePanel';
import {GetSensor, GetSensorStatusColor} from '../api/Sensors';
import {onCreateSensorValue} from '../graphql/subscriptions';

const SensorScreen = ({route, navigation}) => {

  const { sensorId } = route.params;

  const [sensor, setSensor] = useState({});
  const [sensorValue, setSensorValue] = useState({});
  const [readyToSubscribe, setReadyToSubscribe] = useState(false);

  //fetch initial list of sensors and display current state
  useEffect(() => {
    const initSensor = async () => {

      console.log('fetching sensor');

      try {
        const response = await GetSensor(sensorId);

        if (response) {
          setSensor(response);
          console.log('sensor retrived');
          setReadyToSubscribe(true);
        }
      }
      catch (error) {
        console.log('error fetching sensor', error);
      }
    };

    initSensor()

  }, [sensorId]);

  //subscribe to changes in sensor values
  useEffect(() => {

    if (readyToSubscribe) {
      console.log('start subscription to sensor');

      const subscriber = API.graphql(graphqlOperation(onCreateSensorValue, {sensorId : sensorId})).subscribe({
        next: (response) => {

          //update the sensor's status in state
          if (response.value.data.onCreateSensorValue) {
            setSensorValue(response.value.data.onCreateSensorValue)
          }
        },
        error: (error) => {
          console.log('error on sensor subscription', error);
        }
      });

      return () => {
        console.log('terminating subscription to sensor');
        subscriber.unsubscribe();
      }
    }

  }, [readyToSubscribe, sensorId]);

  return (

    <View style={styles.view}>
      <StatusPanel
        title={ sensorValue.status ? sensor.name : 'Fetching sensor...'}
        color={GetSensorStatusColor(sensorValue.status)} 
      />
      <ValuePanel
        title="Temperature"
        value={sensorValue.temperature}
      />
      <ValuePanel
        title="pH"
        value={sensorValue.pH}
      />
            
      <ValuePanel
        title="Salinity"
        value={sensorValue.salinity}
      />
            
      <ValuePanel
        title="Disolved O2"
        value={sensorValue.disolvedO2}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
    backgroundColor: '#303030'
  }
});

export default SensorScreen;
