// tslint:disable
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
    }
  }
`;
