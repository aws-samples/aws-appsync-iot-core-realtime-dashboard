/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateSensor = /* GraphQL */ `
  subscription OnUpdateSensor($id: ID!) {
    onUpdateSensor(id: $id) {
      id
      name
      value
      latitude
      longitude
      status
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSensors = /* GraphQL */ `
  subscription OnUpdateSensors {
    onUpdateSensors {
      id
      name
      value
      latitude
      longitude
      status
      timestamp
      createdAt
      updatedAt
    }
  }
`;
