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

const { ArgumentParser } = require('argparse');

//constants used in the app - do not change
const SENSORS_FILE = './sensors.json';

//open sensor definition file
var sensors = require(SENSORS_FILE);

async function deleteSensors(profile, region){

  try {

    const iotClient = new IoTClient({ profile: profile, region: region });
  
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
    console.log('AWS Profile: ' + profile);
    console.log('AWS Region: ' + region);

    sensors.forEach((sensor) => {
      console.log('Thing Name: ' + sensor.settings.clientId);
    })

  }
  catch (err) {
    console.log('Error deleting sensors');
    console.log(err.message);
  }
}

// parse for profile command line arguent
const parser = new ArgumentParser({
  description: 'Deletes IoT Things for sensors defined in sensors.json'
});

parser.add_argument('--profile', {default: 'default'});
parser.add_argument('--region', {default: 'us-east-1'});

args = parser.parse_args()

deleteSensors(args.profile, args.region);
