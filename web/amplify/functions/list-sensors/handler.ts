import type { Handler } from "aws-lambda";
import { IoTClient, SearchIndexCommand } from "@aws-sdk/client-iot";

const iotClient = new IoTClient();

export const handler: Handler = async (event) => {
  console.log("event", event);

  //query all sensors that have reported a shadow and of type water quality sensor
  //you must have fleet indexing enabled in IoT Core with REGISTRY_AND_SHADOW indexed

  var params = {
    queryString:
      "shadow.reported.name:* AND thingTypeName:WATER_QUALITY_SENSOR",
  };

  var command = new SearchIndexCommand(params);

  var result = await iotClient.send(command);

  // return array of sensors
  return result.things?.map((thing) => {
    const shadow = JSON.parse(thing?.shadow!);
    return {
      sensorId: thing.thingName,
      name: shadow.reported.name || "",
      enabled: shadow.reported.enabled || false,
      geo: {
        latitude: shadow.reported.geo?.latitude || 0,
        longitude: shadow.reported.geo?.longitude || 0,
      },
      status: shadow.reported.status || 0,
    };
  });
};
