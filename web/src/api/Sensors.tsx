import { API, graphqlOperation } from 'aws-amplify';
import { getSensor, listSensors } from '../graphql/queries';
import { GetSensorQuery, ListSensorsQuery } from '../API';

interface IGeo {
    latitude: number,
    longitude: number
}

export interface ISensor {
    sensorId: string,
    name: string,
    geo: IGeo,
    enabled: boolean,
    status: number
}

export interface ISensorType {
    id: string,
    text: string
}

export const GetSensorTypes = (): Array<ISensorType> => {

    return [
        { text: "Temperature", id: "temperature" },
        { text: "Salinity", id: "salinity" },
        { text: "pH", id: "ph" },
        { text: "Disolved O2", id: "disolvedO2" }
    ]
}

export const GetSensorStatusColor = (status : number | null) => {
    
    let r = "";

    if (status === 1) {
        r = "green"
    } else if (status === 2) {
        r = "yellow"
    } else if (status === 3) {
        r = "red"
    } else {
        r = "white"
    }

    return r;
}

export const UpdateSensorMarker = (sensorId: string, status : number) => {

    var marker = document.getElementById('sensor-image-' + sensorId)
        
    if (marker){
        
        let r = GetSensorStatusColor(status)

        marker.style.backgroundColor = r
        marker.style.border = "border: 0.1em solid " + r + ";"
        
        console.log(sensorId + ' updated');
    }
}

export const GetSensorMarker = (sensorId: string, status : number | null) => {
    
    var marker = document.createElement('div')
    marker.id = 'sensor-image-' + sensorId
    marker.className = "sensor"

    let r = GetSensorStatusColor(status)

    marker.style.backgroundColor = r
    marker.style.border = "border: 0.1em solid " + r + ";"

    return marker;
}

export const GetSensor = async (sensorId: string): Promise<ISensor | null> => {

    try {

        const response = (await API.graphql(graphqlOperation(getSensor, {sensorId: sensorId}))) as {
            data: GetSensorQuery;
        };

        if (response.data.getSensor){
            
            const r = response.data.getSensor as ISensor;
            
            return r;
        }
        else {

            return null;
        }

    } catch (error) {
        throw error;
    }
}

export const GetSensors = async (): Promise<Array<ISensor>> => {

    try {

        const response = (await API.graphql(graphqlOperation(listSensors))) as {
            data: ListSensorsQuery;
        };

        if (response.data && response.data.listSensors) {
            
            const r = response.data.listSensors as Array<ISensor>;
            
            return r;
        }
        else {

            return Array<ISensor>();
        }

    } catch (error) {
        throw error;
    }
}