import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { createMap } from "maplibre-gl-js-amplify";
import { Marker, Map } from 'maplibre-gl';
import "maplibre-gl/dist/maplibre-gl.css";
import { GetSensors, UpdateSensorMarker, GetSensorMarker } from '../../api/Sensors';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateSensorValues } from '../../graphql/subscriptions';

import './index.css'

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


    useEffect(() => {

        var map : Map;

        // when sensor clicked - navigate to the sensor detail page
        const sensorClicked = (sensorId : string) : void => {

            var sensorImage = document.getElementById('sensor-image-' + sensorId)
            
            if (sensorImage){
                history.push('/sensor/' + sensorId)
                console.log(sensorId + ' clicked');
            }
        }

        // call api to get list of sensors and display them as markers on the map
        async function  DisplaySensors(map : Map){

            const response = await GetSensors();
    
            if (response) {
    
                console.log('sensors retrived');
                
                response.forEach( (sensor) => {
    
                    var marker = GetSensorMarker(sensor.sensorId, sensor.status) 
                    marker.onclick = () => sensorClicked(sensor.sensorId)
    
                    new Marker(marker)
                        .setLngLat([sensor.geo.longitude, sensor.geo.latitude])
                        .addTo(map);
                })
            }
        }

        // configure and display the map
        async function initializeMap() {

            try {

                //draw map
                map = await createMap({
                    container: "map",
                    center: [-122.2000, 37.70000],
                    zoom: 10, 
                    maxZoom: 11
                })
 
                console.log('Map Rendered')

                await DisplaySensors(map)

            }
            catch (error) {
                console.log('error fetching sensors', error);
            }

        }
        
        initializeMap();
    
        return () => {
            map.remove()
            console.log('map unloaded')
        };

    }, [history]);

    // start subscription for sensor status changes and update sensor marker color
    useEffect(() => {

        // @ts-ignore
        const subscription = API.graphql(graphqlOperation(onCreateSensorValues)).subscribe({
            next: (response: ISensorsSubscriptionResponse) => {
                console.log('sensor subscription value received')
                UpdateSensorMarker(response.value.data.onCreateSensorValues.sensorId, response.value.data.onCreateSensorValues.status)
            },
            error: (error: any) => console.warn(error),
         });
      
        return () => {
            subscription.unsubscribe()
            console.log('subscription cancelled')
        };
    }, []);


    return (
        <div id='map' />
    )
}

export default MapPage;