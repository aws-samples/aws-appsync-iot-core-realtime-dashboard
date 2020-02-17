// tslint:disable
// this is an auto generated file. This will be overwritten

export const getSensor = /* GraphQL */ `
  query GetSensor($id: ID!) {
    getSensor(id: $id) {
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
export const listSensors = /* GraphQL */ `
  query ListSensors(
    $filter: ModelSensorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSensors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        value
        latitude
        longitude
        status
        timestamp
      }
      nextToken
    }
  }
`;
