/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiIotdashboardGraphQLAPIIdOutput = process.env.API_IOTDASHBOARD_GRAPHQLAPIIDOUTPUT
var apiIotdashboardGraphQLAPIEndpointOutput = process.env.API_IOTDASHBOARD_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const appsync = require('aws-appsync');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

const region = process.env.REGION
const apiIotdashboardGraphQLAPIEndpointOutput = process.env.API_IOTDASHBOARD_GRAPHQLAPIENDPOINTOUTPUT

AWS.config.update({
    region: region
});

const credentials = AWS.config.credentials;

exports.handler = async (event) => {

    console.log('event received:' + JSON.stringify(event));
    
    //create appsync client - using IAM permissions
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: apiIotdashboardGraphQLAPIEndpointOutput,
        region: region,
        auth: {
          type: 'AWS_IAM',
          credentials: credentials
        },
        disableOffline: true
    });

    //define the graphql mutation to update the sensor
    const mutation = gql`mutation UpdateSensor(
        $input: UpdateSensorInput!
        $condition: ModelSensorConditionInput
      ) {
        updateSensor(input: $input, condition: $condition) {
          id
          name
          value
          latitude
          longitude
          status
          timestamp
        }
      }`;

    //set the status based on the current value
    let status = 1;
    if (event.data.value >= 100) {
        status = 3;
    } else if (event.data.value >= 80){
        status = 2;
    }

    //execute the mutation
    try {

      var r = await graphqlClient.mutate({
        mutation,
        variables: {input: {
            id: event.id,
            value: event.data.value,
            status: status,
            timestamp: event.data.timestamp
        }}
      });

      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success', data: r })
      }
    
      return response
    }
    catch (err) {

      const response = {
        statusCode: 400,
        body: JSON.stringify({ message: err.message })
      }

      return response
    }
}

