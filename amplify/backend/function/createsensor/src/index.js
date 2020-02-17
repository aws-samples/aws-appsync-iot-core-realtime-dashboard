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

    //define the graphql query to verify if the sensor exists
    const getSensor = gql`query GetSensor($id: ID!) {
        getSensor(id: $id) {
          id
          name
          value
          latitude
          longitude
          status
          timestamp
        }
      }`;
  
      //define the graphql mutation to create the sensor record
      const createSensor = gql`mutation CreateSensor(
        $input: CreateSensorInput!
        $condition: ModelSensorConditionInput
      ) {
        createSensor(input: $input, condition: $condition) {
          id
          name
          value
          latitude
          longitude
          status
          timestamp
        }
      }`;
  
      //execute the mutations
      try {
  
        //execute the get query to see if the sensor already exists
        const sensor = await graphqlClient.query({
          query: getSensor,
          variables: {
              id: event.id
            }
        });
  
        console.log('getSensor query executed');
  
        //if the sensor does not exist - create it
        if (!sensor.data.getSensor)
        {
          console.log('sensor record does not exist - creating new record');
  
          await graphqlClient.mutate({
            mutation: createSensor,
            variables: {input: {
                id: event.id,
                name: event.data.name,
                latitude: event.data.latitude,
                longitude: event.data.longitude,
                value: 0,
                status: 1,
                timestamp: new Date().getTime() * 1000
            }}
          });
  
          console.log('sensor record created');
        }
        else {
          console.log('sensor record already exists');
        }
  
        const response = {
          statusCode: 200,
          body: JSON.stringify({ message: 'Success' })
        }
      
        return response
      }
      catch (err) {
  
        console.log('an error occured');
  
        const response = {
          statusCode: 400,
          body: JSON.stringify({ message: err.message })
        }
  
        return response
      }  
}

