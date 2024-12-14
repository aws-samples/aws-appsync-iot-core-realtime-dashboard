import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { listSensors } from "../functions/list-sensors/resource";
import { sendSensorValue } from "../functions/send-sensor-value/resource";

const schema = a
  .schema({
    SensorValue: a.model({
      id: a.id(),
      sensorId: a.string().required(),
      pH: a.float().required(),
      temperature: a.float().required(),
      salinity: a.float().required(),
      disolvedO2: a.float().required(),
      status: a.integer().required(),
      timestamp: a.timestamp().required(),
    }),
    Geo: a.customType({
      latitude: a.float(),
      longitude: a.float(),
    }),
    Sensor: a.customType({
      sensorId: a.string().required(),
      name: a.string().required(),
      geo: a.ref("Geo").required(),
      enabled: a.boolean().required(),
      status: a.integer().required(),
    }),
    listSensors: a
      .query()
      .returns(a.ref("Sensor").array())
      .handler(a.handler.function(listSensors)),
  })
  .authorization((allow) => [
    allow.authenticated(),
    allow.resource(sendSensorValue),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
