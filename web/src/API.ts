/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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
  id?: string | null,
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

export type CreateSensorValueMutationVariables = {
  input: CreateSensorValueInput,
  condition?: ModelSensorValueConditionInput | null,
};

export type CreateSensorValueMutation = {
  createSensorValue:  {
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
  updateSensorValue:  {
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
  deleteSensorValue:  {
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
  listSensors:  Array< {
    __typename: "Sensor",
    sensorId: string,
    name: string,
    enabled: boolean,
    geo:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    },
    status: number | null,
  } | null > | null,
};

export type GetSensorQueryVariables = {
  sensorId: string,
};

export type GetSensorQuery = {
  getSensor:  {
    __typename: "Sensor",
    sensorId: string,
    name: string,
    enabled: boolean,
    geo:  {
      __typename: "Geo",
      latitude: number,
      longitude: number,
    },
    status: number | null,
  } | null,
};

export type GetSensorValueQueryVariables = {
  id: string,
};

export type GetSensorValueQuery = {
  getSensorValue:  {
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
  listSensorValues:  {
    __typename: "ModelSensorValueConnection",
    items:  Array< {
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
    nextToken: string | null,
  } | null,
};

export type OnCreateSensorValueSubscriptionVariables = {
  sensorId: string,
};

export type OnCreateSensorValueSubscription = {
  onCreateSensorValue:  {
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
  onCreateSensorValues:  {
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
