/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createSensorValue = /* GraphQL */ `
  mutation CreateSensorValue(
    $input: CreateSensorValueInput!
    $condition: ModelSensorValueConditionInput
  ) {
    createSensorValue(input: $input, condition: $condition) {
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
export const updateSensorValue = /* GraphQL */ `
  mutation UpdateSensorValue(
    $input: UpdateSensorValueInput!
    $condition: ModelSensorValueConditionInput
  ) {
    updateSensorValue(input: $input, condition: $condition) {
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
export const deleteSensorValue = /* GraphQL */ `
  mutation DeleteSensorValue(
    $input: DeleteSensorValueInput!
    $condition: ModelSensorValueConditionInput
  ) {
    deleteSensorValue(input: $input, condition: $condition) {
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
