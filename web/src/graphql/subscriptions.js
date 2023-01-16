/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSensorValue = /* GraphQL */ `
  subscription OnCreateSensorValue(
    $filter: ModelSubscriptionSensorValueFilterInput
  ) {
    onCreateSensorValue(filter: $filter) {
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
export const onUpdateSensorValue = /* GraphQL */ `
  subscription OnUpdateSensorValue(
    $filter: ModelSubscriptionSensorValueFilterInput
  ) {
    onUpdateSensorValue(filter: $filter) {
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
export const onDeleteSensorValue = /* GraphQL */ `
  subscription OnDeleteSensorValue(
    $filter: ModelSubscriptionSensorValueFilterInput
  ) {
    onDeleteSensorValue(filter: $filter) {
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
