import { API, graphqlOperation } from 'aws-amplify';
import { getSensor, listSensors } from '../graphql/queries';
import { GetSensorQuery, ListSensorsQuery } from '../API';

export interface ISensor {
    id: string,
    name: string,
    latitude: number,
    longitude: number,
    status: number,
    value: number,
    timestamp: number
}

export const GetSensorStatusColor = (status : number) => {
    
    let r = "";

    if (status === 1) {
      r = "green"
    } else if (status === 2) {
      r = "yellow"
    } else {
      r = "red"
    }

    return r;
}

export const GetSensor = async (id: string): Promise<ISensor | null> => {

    try {

        const response = (await API.graphql(graphqlOperation(getSensor, {id: id}))) as {
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

        if (response.data.listSensors && response.data.listSensors.items) {
            
            const r = response.data.listSensors.items as Array<ISensor>;
            
            return r;
        }
        else {

            return Array<ISensor>();
        }

    } catch (error) {
        throw error;
    }
}
