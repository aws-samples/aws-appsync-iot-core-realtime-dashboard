
import { useEffect } from 'react';
import { createMap } from "maplibre-gl-js-amplify";
import { Marker } from 'maplibre-gl';
import { generateClient } from 'aws-amplify/api';
import { listSensors } from './graphql/queries';
import { onCreateSensorValue } from './graphql/subscriptions';

import "maplibre-gl/dist/maplibre-gl.css";
import './MapPage.css';

const MapPage = () => {

    useEffect(() => {

        var map;

        const CreateSensorMarker = (sensor) => {

            var marker = document.createElement('div')
            marker.id = 'sensor-image-' + sensor.sensorId
            marker.className = "sensor"
    
            let sensorColor = 'white'
            marker.style.backgroundColor = sensorColor
            marker.style.border = "border: 0.1em solid " + sensorColor + ";"
    
            return marker;
        }

        // call api to get list of sensors and display them as markers on the map
        async function DisplaySensors(map) {

            const client = generateClient();
            const response = await client.graphql({ query: listSensors})
            console.log('API Response:', response)

            if (response && response.data) {

                console.log('sensors retrived');

                response.data.listSensors.forEach((sensor) => {

                    var marker = CreateSensorMarker(sensor)
                    console.log(marker)
                    console.log(sensor)
                    new Marker({element: marker})
                        .setLngLat([sensor.geo.longitude, sensor.geo.latitude])
                        .addTo(map);
                })
            }
        }

        // configure and display the map
        async function initializeMap() {

            try {
                map = await createMap({
                    container: "map",
                    center: [-122.2000, 37.70500],
                    zoom: 10,
                    maxZoom: 10
                })

                map.repaint = true;

                console.log('Map Rendered')

                await DisplaySensors(map)

            }
            catch (error) {
                console.log('error fetching sensors', error);
            }
        }

        initializeMap();
    }, []);

    // start subscription for sensor status changes and update sensor marker color
    useEffect(() => {

        const UpdateSensorMarker = (sensorId, status) => {

            var marker = document.getElementById('sensor-image-' + sensorId)
                
            if (marker){
                
                let sensorColor = "";

                if (status === 1) {
                    sensorColor = "green"
                } else if (status === 2) {
                    sensorColor = "yellow"
                } else if (status === 3) {
                    sensorColor = "red"
                } else {
                    sensorColor = "white"
                }

                marker.style.backgroundColor = sensorColor
                marker.style.border = `border: 0.1em solid ${sensorColor};`
                
                console.log(sensorId + ' updated');
            }
        }

        const client = generateClient();
        const createSub = client
            .graphql({ query: onCreateSensorValue })
            .subscribe({
                next: ({ data }) => {
                    UpdateSensorMarker(data.onCreateSensorValue.sensorId, data.onCreateSensorValue.status)
                },
                error: (error) => console.warn(error)
        });
        
    }, []);
    
    return (
        <div id='container'>
            <div id='banner'>Bay Health</div>
            <div id='map' className='fullscreen-map' />

        </div>
    );
}

export default MapPage;
