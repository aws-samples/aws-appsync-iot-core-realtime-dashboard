const fs = require('fs').promises;
const {
  IoTClient,
  DescribeEndpointCommand,
  UpdateIndexingConfigurationCommand,
  CreatePolicyCommand,
  CreateKeysAndCertificateCommand,
  CreateThingTypeCommand,
  CreateThingCommand,
  AttachPolicyCommand,
  AttachThingPrincipalCommand
} = require("@aws-sdk/client-iot");

//if you wish to use a profile other than default, set an AWS_PROFILE environment variable when you run this app
//for example:
//AWS_PROFILE=my-aws-profile node create-sensors.js
const PROFILE = process.env.AWS_PROFILE || 'default';

//constants used in the app - do not change
const SENSORS_FILE = './sensors.json';
const CERT_FOLDER = './certs/';
const POLICY_FILE = './policy.json';
const ROOT_CA_FILE = 'AmazonRootCA1.pem';

//open sensor definition file
var sensors = require(SENSORS_FILE);
const policyDocument = require(POLICY_FILE);

async function createSensors(){

  try {

    const iotClient = new IoTClient({ profile: PROFILE });
  
    // get the regional IOT endpoint
    var params = { endpointType: 'iot:Data-ATS'};
    var command = new DescribeEndpointCommand(params);
    const response = await iotClient.send(command);
    const host = response.endpointAddress;

    //enable thing fleet indexing to enable searching things
    params = {
      thingIndexingConfiguration: { 
      thingIndexingMode: "REGISTRY_AND_SHADOW"
      }
    }

    command = new UpdateIndexingConfigurationCommand(params)
    var result = await iotClient.send(command)

    //iterate over all sensors and create policies, certs, and things
    sensors.forEach(async (sensor) => {

        //set the iot core endpoint
        sensor.settings.host = host;
    
        //create the IOT policy
        var policyName = 'Policy-' + sensor.settings.clientId;
        var policy = { policyName: policyName, policyDocument: JSON.stringify(policyDocument)};
        command = new CreatePolicyCommand(policy)
        result = await iotClient.send(command)

        //create the certificates
        command = new CreateKeysAndCertificateCommand({setAsActive:true});
        result = await iotClient.send(command)
        sensor.settings.certificateArn = result.certificateArn;
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
      
        // //create the thing type
        params = {
          thingTypeName: sensor.thingTypeName
        }

        command = new CreateThingTypeCommand(params)
        result = await iotClient.send(command)

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

        command = new CreateThingCommand(params)
        await iotClient.send(command)

        //attach policy to certificate
        command = new AttachPolicyCommand({ policyName: policyName, target: sensor.settings.certificateArn})
        await iotClient.send(command)
            
        //attach thing to certificate
        command = new AttachThingPrincipalCommand({thingName: sensor.settings.clientId, principal: sensor.settings.certificateArn})
        await iotClient.send(command)

        //save the updated settings file
        let data = JSON.stringify(sensors, null, 2);
        await fs.writeFile(SENSORS_FILE, data);
    })

    //display results
    console.log('IoT Things provisioned');
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
