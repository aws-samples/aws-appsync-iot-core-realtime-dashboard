/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listSensors = /* GraphQL */ `
  query ListSensors {
    listSensors {
      sensorId
      name
      enabled
      geo {
        latitude
        longitude
      }
      status
    }
  }
`;
export const getSensor = /* GraphQL */ `
  query GetSensor($sensorId: String!) {
    getSensor(sensorId: $sensorId) {
      sensorId
      name
      enabled
      geo {
        latitude
        longitude
      }
      status
    }
  }
`;
export const getSensorValue = /* GraphQL */ `
  query GetSensorValue($id: ID!) {
    getSensorValue(id: $id) {
      id
      sensorId
      pH
      temperature
      salinity
      disolvedO2
      status
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const listSensorValues = /* GraphQL */ `
  query ListSensorValues(
    $filter: ModelSensorValueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSensorValues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sensorId
        pH
        temperature
        salinity
        disolvedO2
        status
        timestamp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
