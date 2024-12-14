import type { Handler } from "aws-lambda";
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT || "";
const AWS_REGION = process.env.AWS_REGION || "";
const { Sha256 } = crypto;

export const handler: Handler = async (event) => {
  console.log("event", event);

  //set a random sensor status 1-3
  let status = Math.floor(Math.random() * 3) + 1;

  const query = /* GraphQL */ `
    mutation CreateSensorValue($input: CreateSensorValueInput!) {
      createSensorValue(input: $input) {
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

  const variables = {
    input: {
      sensorId: event.sensorId,
      pH: event.data.pH,
      temperature: event.data.temperature,
      salinity: event.data.salinity,
      disolvedO2: event.data.disolvedO2,
      status: status,
      timestamp: event.data.timestamp,
    },
  };

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    console.log(body);
  } catch (error: any) {
    console.log(error);
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
  };
};
