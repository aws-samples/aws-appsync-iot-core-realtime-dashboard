const fs = require('fs').promises;
const {
  IoTClient,
  DetachThingPrincipalCommand,
  DeleteThingCommand,
  DetachPolicyCommand,
  DeletePolicyCommand,
  UpdateCertificateCommand,
  DeleteCertificateCommand
} = require("@aws-sdk/client-iot");

//if you wish to use a profile other than default, set an AWS_PROFILE environment variable when you run this app
//for example:
//AWS_PROFILE=my-aws-profile node delete-sensors.js
const PROFILE = process.env.AWS_PROFILE || 'default';

//constants used in the app - do not change
const SENSORS_FILE = './sensors.json';

//open sensor definition file
var sensors = require(SENSORS_FILE);

async function deleteSensors(){

  try {

    const iotClient = new IoTClient({ profile: PROFILE });
  
    //iterate over all sensors and create policies, certs, and things
    sensors.forEach(async (sensor) => {

        //remove the iot core endpoint
        sensor.settings.host = "";
    
        //attach thing to certificate
        var command = new DetachThingPrincipalCommand({thingName: sensor.settings.clientId, principal: sensor.settings.certificateArn})
        await iotClient.send(command)

        //delete the thing
        command = new DeleteThingCommand({thingName: sensor.settings.clientId})
        await iotClient.send(command)

        //detach policy from certificate
        var policyName = 'Policy-' + sensor.settings.clientId;
        command = new DetachPolicyCommand({ policyName: policyName, target: sensor.settings.certificateArn})
        await iotClient.send(command)

        //delete the IOT policy
        command = new DeletePolicyCommand({policyName: policyName})
        await iotClient.send(command)

        //delete the certificates
        var certificateId = sensor.settings.certificateArn.split('/')[1];
        command = new UpdateCertificateCommand({certificateId:certificateId, newStatus:"INACTIVE"})
        await iotClient.send(command)

        command = new DeleteCertificateCommand({certificateId:certificateId, forceDelete:true})
        await iotClient.send(command)
        sensor.settings.certificateArn = ""

        //delete the certificate files
        await fs.unlink(sensor.settings.keyPath);
        sensor.settings.keyPath = "";

        await fs.unlink(sensor.settings.certPath);
        sensor.settings.certPath = "";
        sensor.settings.caPath = "";

        //save the updated settings file
        let data = JSON.stringify(sensors, null, 2);
        await fs.writeFile(SENSORS_FILE, data);
    })

    //display results
    console.log('IoT Things removed: ' + sensors.length);
    console.log('AWS Profile: ' + PROFILE);

    sensors.forEach((sensor) => {
      console.log('Thing Name: ' + sensor.settings.clientId);
    })

  }
  catch (err) {

    console.log('Error deleting sensors');
    console.log(err.message);
  }
}

deleteSensors();
