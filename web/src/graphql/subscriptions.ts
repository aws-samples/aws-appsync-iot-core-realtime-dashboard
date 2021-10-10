/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSensorValue = /* GraphQL */ `
  subscription OnCreateSensorValue($sensorId: String!) {
    onCreateSensorValue(sensorId: $sensorId) {
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
export const onCreateSensorValues = /* GraphQL */ `
  subscription OnCreateSensorValues {
    onCreateSensorValues {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
