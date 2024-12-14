import { defineFunction } from "@aws-amplify/backend";

export const sendSensorValue = defineFunction({
  entry: "./handler.ts",
  name: "sendSensorValue",
  resourceGroupName: "data",
});
