process.env.AWS_SDK_LOAD_CONFIG = true;

const AWS = require('aws-sdk');
const fs = require('fs').promises;

//if a region is not specified in your local AWS config, it will default to us-east-1
const REGION = AWS.config.region || 'us-east-1';

//if you wish to use a profile other than default, set an AWS_PROFILE environment variable when you run this app
//for example:
//AWS_PROFILE=my-aws-profile node create-sensor.js
const PROFILE = process.env.AWS_PROFILE || 'default';

//constants used in the app - do not change
const SENSORS_FILE = './sensors.json';
const CERT_FOLDER = './certs/';
const POLICY_FILE = './policy.json';
const ROOT_CA_FILE = 'AmazonRootCA1.pem';

//open sensor definition file
var sensors = require(SENSORS_FILE);
const policyDocument = require(POLICY_FILE);

//use the credentials from the AWS profile
var credentials = new AWS.SharedIniFileCredentials({profile: PROFILE});
AWS.config.credentials = credentials;

AWS.config.update({
    region: REGION
});

async function createSensors(){

  try {

    var iot = new AWS.Iot();
  
    // get the regional IOT endpoint
    var params = { endpointType: 'iot:Data-ATS'};
    var result = await iot.describeEndpoint(params).promise();
    const host = result.endpointAddress;
  
    //enable thing fleet indexing to enable searching things
    params = {
      thingIndexingConfiguration: { 
      thingIndexingMode: "REGISTRY_AND_SHADOW"
      }
    }

    result = await iot.updateIndexingConfiguration(params).promise();

    //iterate over all sensors and create policies, certs, and things
    sensors.forEach(async (sensor) => {

        //set the iot core endpoint
        sensor.settings.host = host;
    
        //create the IOT policy
        var policyName = 'Policy-' + sensor.settings.clientId;
        var policy = { policyName: policyName, policyDocument: JSON.stringify(policyDocument)};
        result = await iot.createPolicy(policy).promise()

        //create the certificates
        result = await iot.createKeysAndCertificate({setAsActive:true}).promise();
        sensor.settings.certificateArn = result.certificateArn;
        const certificateArn = result.certificateArn;
        const certificatePem = result.certificatePem;
        const privateKey = result.keyPair.PrivateKey;

        //save the certificate
        var fileName = CERT_FOLDER + sensor.settings.clientId + '-certificate.pem.crt';
        sensor.settings.certPath = fileName;
        await fs.writeFile(fileName, certificatePem);

        //save the private key
        fileName = CERT_FOLDER + sensor.settings.clientId + '-private.pem.key';
        sensor.settings.keyPath = fileName;
        await fs.writeFile(fileName, privateKey);

        //save the AWS root certificate
        sensor.settings.caPath = CERT_FOLDER + ROOT_CA_FILE;
      
        //create the thing type
        params = {
          thingTypeName: sensor.thingTypeName
        }
        await iot.createThingType(params).promise();

        //create the thing
        params = {
          thingName: sensor.settings.clientId,
          attributePayload: {
            attributes: {
              'Manufacturer': sensor.manufacturer,
              'Model': sensor.model,
              'Firmware': sensor.firmware
            },
            merge: false
          },
          thingTypeName: sensor.thingTypeName
        };

        await iot.createThing(params).promise();

        //attach policy to certificate
        await iot.attachPolicy({ policyName: policyName, target: certificateArn}).promise();
            
        //attach thing to certificate
        await iot.attachThingPrincipal({thingName: sensor.settings.clientId, principal: certificateArn}).promise();

        //save the updated settings file
        let data = JSON.stringify(sensors, null, 2);
        await fs.writeFile(SENSORS_FILE, data);
    })

    //display results
    console.log('IoT Things provisioned');
    console.log('AWS Region: ' + REGION);
    console.log('AWS Profile: ' + PROFILE);

    sensors.forEach((sensor) => {
      console.log('Thing Name: ' + sensor.settings.clientId);
    })

  }
  catch (err) {

    console.log('Error creating sensors');
    console.log(err.message);
  }

}

createSensors();
