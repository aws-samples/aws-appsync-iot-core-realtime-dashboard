import { defineFunction } from "@aws-amplify/backend";

export const listSensors = defineFunction({
  entry: "./handler.ts",
  name: "listSensors",
});
