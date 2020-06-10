import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import SensorMarker from '../../components/SensorMarker/SensorMarker'
import { onCreateSensorValues } from '../../graphql/subscriptions';
import { ISensor, GetSensors, GetSensorStatusColor } from '../../api/Sensors';

import settings from '../../settings.json';

const useStyles = makeStyles(() => ({
  navStyle: {
    position: "absolute",
    top: 36,
    left: 0,
    padding: "10px"
  }
}));

interface IViewPort {
  latitude: number,
  longitude: number,
  zoom: number,
  bearing: number,
  pitch: number
}

interface ISensorsSubscriptionResponse {
  value: {
    data: {
      onCreateSensorValues: {
        sensorId: string,
        status: number
      }
    }
  }
}

const MapPage: React.FC = () => {
  
  const history = useHistory();
  const classes = useStyles();
  const maxZoom = 10;

  //state variables
  const [viewPort, setViewPort] = useState<IViewPort>({
        latitude: 37.666743,
        longitude: -122.185435,
        zoom: maxZoom,
        bearing: 0,
        pitch: 0
      }
  ); 

  const [sensors, setSensors] = useState<Array<ISensor>>([]);
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
        next: (response: ISensorsSubscriptionResponse) => {

          //update the sensor's status in state
          if (response.value.data.onCreateSensorValues) {
            
            var newSensors = [...sensors];
        
            for (let item of newSensors) {
              if (item.sensorId === response.value.data.onCreateSensorValues.sensorId){
                item.status = response.value.data.onCreateSensorValues.status;
                break;
              }
            }

            console.log('sensors updated');

            setSensors(newSensors);
          }
        },
        error: (error: any) => {
          console.log('error on sensors subscription', error);
        }
      });

      return () => {
        console.log('terminating subscription to sensors');
        subscriber.unsubscribe();
      }
    }

  // eslint-disable-next-line 
  }, [readyToSubscribe]);

  const updateViewPort = (viewPort : IViewPort) => {
    if (viewPort.zoom >= maxZoom) {
      setViewPort(viewPort);
    } 
  }

  const handleSensorClick = (id : string) => {
    history.push('/sensor/' + id)
  }

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={updateViewPort}
        mapboxApiAccessToken={settings.mapboxApiAccessToken}
      >

        {sensors.map((sensor) =>
            (
              <SensorMarker 
                key={sensor.sensorId}
                id={sensor.sensorId}
                latitude={sensor.geo.latitude}
                longitude={sensor.geo.longitude}
                color={GetSensorStatusColor(sensor.status)}
                onSensorClick={handleSensorClick}
              />
            )
          )
        }

        <div className={classes.navStyle}>
          <NavigationControl />
        </div>

      </ReactMapGL>
    </div>
  );
}

export default MapPage;
