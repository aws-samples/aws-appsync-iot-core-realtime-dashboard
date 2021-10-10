/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type CreateSensorValueInput = {
  id?: string | null,
  sensorId: string,
  pH: number,
  temperature: number,
  salinity: number,
  disolvedO2: number,
  status: number,
  timestamp: number,
};

export type ModelSensorValueConditionInput = {
  sensorId?: ModelStringInput | null,
  pH?: ModelFloatInput | null,
  temperature?: ModelFloatInput | null,
  salinity?: ModelFloatInput | null,
  disolvedO2?: ModelFloatInput | null,
  status?: ModelIntInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelSensorValueConditionInput | null > | null,
  or?: Array< ModelSensorValueConditionInput | null > | null,
  not?: ModelSensorValueConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type SensorValue = {
  __typename: "SensorValue",
  id: string,
  sensorId: string,
  pH: number,
  temperature: number,
  salinity: number,
  disolvedO2: number,
  status: number,
  timestamp: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSensorValueInput = {
  id: string,
  sensorId?: string | null,
  pH?: number | null,
  temperature?: number | null,
  salinity?: number | null,
  disolvedO2?: number | null,
  status?: number | null,
  timestamp?: number | null,
};

export type DeleteSensorValueInput = {
  id: string,
};

export type Sensor = {
  __typename: "Sensor",
  sensorId: string,
  name: string,
  enabled: boolean,
  geo: Geo,
  status?: number | null,
};

export type Geo = {
  __typename: "Geo",
  latitude: number,
  longitude: number,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items?:  Array<Todo | null > | null,
  nextToken?: string | null,
};

export type ModelSensorValueFilterInput = {
  id?: ModelIDInput | null,
  sensorId?: ModelStringInput | null,
  pH?: ModelFloatInput | null,
  temperature?: ModelFloatInput | null,
  salinity?: ModelFloatInput | null,
  disolvedO2?: ModelFloatInput | null,
  status?: ModelIntInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelSensorValueFilterInput | null > | null,
  or?: Array< ModelSensorValueFilterInput | null > | null,
  not?: ModelSensorValueFilterInput | null,
};

export type ModelSensorValueConnection = {
  __typename: "ModelSensorValueConnection",
  items?:  Array<SensorValue | null > | null,
  nextToken?: string | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSensorValueMutationVariables = {
  input: CreateSensorValueInput,
  condition?: ModelSensorValueConditionInput | null,
};

export type CreateSensorValueMutation = {
  createSensorValue?:  {
    __typename: "SensorValue",
    id: string,
    sensorId: string,
    pH: number,
    temperature: number,
    salinity: number,
    disolvedO2: number,
    status: number,
    timestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSensorValueMutationVariables = {
  input: UpdateSensorValueInput,
  condition?: ModelSensorValueConditionInput | null,
};

export type UpdateSensorValueMutation = {
  updateSensorValue?:  {
    __typename: "SensorValue",
    id: string,
    sensorId: string,
    pH: number,
    temperature: number,
    salinity: number,
    disolvedO2: number,
    status: number,
    timestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSensorValueMutationVariables = {
  input: DeleteSensorValueInput,
  condition?: ModelSensorValueConditionInput | null,
};

export type DeleteSensorValueMutation = {
  deleteSensorValue?:  {
    __typename: "SensorValue",
    id: string,
    sensorId: string,
    pH: number,
    temperature: number,
    salinity: number,
    disolvedO2: number,
    status: number,
    timestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSensorsQuery = {
  listSensors?:  Array< {
    __typename: "Sensor",
    sensorId: string,
    name: string,
    enabled: boolean,
    geo:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    },
    status?: number | null,
  } | null > | null,
};

export type GetSensorQueryVariables = {
  sensorId: string,
};

export type GetSensorQuery = {
  getSensor?:  {
    __typename: "Sensor",
    sensorId: string,
    name: string,
    enabled: boolean,
    geo:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    },
    status?: number | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items?:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSensorValueQueryVariables = {
  id: string,
};

export type GetSensorValueQuery = {
  getSensorValue?:  {
    __typename: "SensorValue",
    id: string,
    sensorId: string,
    pH: number,
    temperature: number,
    salinity: number,
    disolvedO2: number,
    status: number,
    timestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSensorValuesQueryVariables = {
  filter?: ModelSensorValueFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSensorValuesQuery = {
  listSensorValues?:  {
    __typename: "ModelSensorValueConnection",
    items?:  Array< {
      __typename: "SensorValue",
      id: string,
      sensorId: string,
      pH: number,
      temperature: number,
      salinity: number,
      disolvedO2: number,
      status: number,
      timestamp: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSensorValueSubscriptionVariables = {
  sensorId: string,
};

export type OnCreateSensorValueSubscription = {
  onCreateSensorValue?:  {
    __typename: "SensorValue",
    id: string,
    sensorId: string,
    pH: number,
    temperature: number,
    salinity: number,
    disolvedO2: number,
    status: number,
    timestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSensorValuesSubscription = {
  onCreateSensorValues?:  {
    __typename: "SensorValue",
    id: string,
    sensorId: string,
    pH: number,
    temperature: number,
    salinity: number,
    disolvedO2: number,
    status: number,
    timestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
