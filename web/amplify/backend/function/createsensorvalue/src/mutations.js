"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTodo = exports.updateSensorValue = exports.deleteTodo = exports.deleteSensorValue = exports.createTodo = exports.createSensorValue = void 0;

/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
var createTodo =
/* GraphQL */
"\n  mutation CreateTodo(\n    $input: CreateTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n    createTodo(input: $input, condition: $condition) {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createTodo = createTodo;
var updateTodo =
/* GraphQL */
"\n  mutation UpdateTodo(\n    $input: UpdateTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n    updateTodo(input: $input, condition: $condition) {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateTodo = updateTodo;
var deleteTodo =
/* GraphQL */
"\n  mutation DeleteTodo(\n    $input: DeleteTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n    deleteTodo(input: $input, condition: $condition) {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteTodo = deleteTodo;
var createSensorValue =
/* GraphQL */
"\n  mutation CreateSensorValue(\n    $input: CreateSensorValueInput!\n    $condition: ModelSensorValueConditionInput\n  ) {\n    createSensorValue(input: $input, condition: $condition) {\n      id\n      sensorId\n      pH\n      temperature\n      salinity\n      disolvedO2\n      status\n      timestamp\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createSensorValue = createSensorValue;
var updateSensorValue =
/* GraphQL */
"\n  mutation UpdateSensorValue(\n    $input: UpdateSensorValueInput!\n    $condition: ModelSensorValueConditionInput\n  ) {\n    updateSensorValue(input: $input, condition: $condition) {\n      id\n      sensorId\n      pH\n      temperature\n      salinity\n      disolvedO2\n      status\n      timestamp\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateSensorValue = updateSensorValue;
var deleteSensorValue =
/* GraphQL */
"\n  mutation DeleteSensorValue(\n    $input: DeleteSensorValueInput!\n    $condition: ModelSensorValueConditionInput\n  ) {\n    deleteSensorValue(input: $input, condition: $condition) {\n      id\n      sensorId\n      pH\n      temperature\n      salinity\n      disolvedO2\n      status\n      timestamp\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteSensorValue = deleteSensorValue;
