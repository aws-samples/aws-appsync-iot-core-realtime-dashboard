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
        __typename
      }
      status
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
