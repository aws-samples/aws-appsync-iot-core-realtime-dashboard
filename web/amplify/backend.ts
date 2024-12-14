import { defineBackend } from "@aws-amplify/backend";
import { Policy, PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { CfnMap } from "aws-cdk-lib/aws-location";
import { CfnTopicRule } from "aws-cdk-lib/aws-iot";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { listSensors } from "./functions/list-sensors/resource";
import { sendSensorValue } from "./functions/send-sensor-value/resource";

const backend = defineBackend({
  auth,
  data,
  listSensors,
  sendSensorValue,
});

// disable unauthenticated access
const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = false;

// Mapping Resources
const geoStack = backend.createStack("geo-stack");

// create a map
const map = new CfnMap(geoStack, "Map", {
  mapName: "SensorMap",
  description: "Sensor Map",
  configuration: {
    style: "VectorEsriDarkGrayCanvas",
  },
  pricingPlan: "RequestBasedUsage",
  tags: [
    {
      key: "name",
      value: "SensorMap",
    },
  ],
});

// create an IAM policy to allow interacting with geo resource
const myGeoPolicy = new Policy(geoStack, "GeoPolicy", {
  policyName: "myGeoPolicy",
  statements: [
    new PolicyStatement({
      actions: [
        "geo:GetMapTile",
        "geo:GetMapSprites",
        "geo:GetMapGlyphs",
        "geo:GetMapStyleDescriptor",
      ],
      resources: [map.attrArn],
    }),
  ],
});

// apply the policy to the authenticated role
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(myGeoPolicy);

// patch the map resource to the expected output configuration
backend.addOutput({
  geo: {
    aws_region: geoStack.region,
    maps: {
      items: {
        [map.mapName]: {
          style: "VectorEsriDarkGrayCanvas",
        },
      },
      default: map.mapName,
    },
  },
});

// IoT Resources

// grant the list sensors function access to search all IoT devices
const listSensorsLambda = backend.listSensors.resources.lambda;

listSensorsLambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["iot:SearchIndex"],
    resources: ["arn:aws:iot:*:*:*"],
  })
);

const iotStack = backend.createStack("iot-stack");

const sendSensorValueLambda = backend.sendSensorValue.resources.lambda;

// create a rule to process messages from the sensors - send them to the lambda function
const rule = new CfnTopicRule(iotStack, "SendSensorValueRule", {
  topicRulePayload: {
    sql: "select * as data, topic(4) as sensorId from 'dt/bay-health/SF/+/sensor-value'",
    actions: [
      {
        lambda: {
          functionArn: sendSensorValueLambda.functionArn,
        },
      },
    ],
  },
});

// allow IoT rule to invoke the lambda function
sendSensorValueLambda.addPermission("AllowIoTInvoke", {
  principal: new ServicePrincipal("iot.amazonaws.com"),
  sourceArn: `arn:aws:iot:${iotStack.region}:${iotStack.account}:rule/SendSensorValueRule*`,
});
