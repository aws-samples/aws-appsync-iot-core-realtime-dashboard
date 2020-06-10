const awsIot = require('aws-iot-device-sdk');

//load the sensors file that contains the location of the device certificates and the clientId of the sensor
var sensors = require('./sensors.json');

//constants used in the application
const SHADOW_TOPIC = "$aws/things/[thingName]/shadow/update";
const VALUE_TOPIC = "dt/bay-health/SF/[thingName]/sensor-value"; //topic to which sensor values will be published

//shadow document to be transmitted at statup
var shadowDocument = {
    state: {
        reported: {
            name: "",
            enabled: true,
            geo: {
                latitude: 0,
                longitude: 0
            }
        }
    }
}

async function run(sensor) {

    //initialize the IOT device
    var device = awsIot.device(sensor.settings);

    //create a placeholder for the message
    var msg = {
        pH: 0,
        temperature: 0,
        salinity: 0,
        disolvedO2: 0,
        timestamp: new Date().getTime()
    }

    device.on('connect', function() {
    
        console.log('connected to IoT Hub');
    
        //publish the shadow document for the sensor
        var topic = SHADOW_TOPIC.replace('[thingName]', sensor.settings.clientId);
    
        shadowDocument.state.reported.name = sensor.name;
        shadowDocument.state.reported.enabled = true;
        shadowDocument.state.reported.geo.latitude = sensor.geo.latitude;
        shadowDocument.state.reported.geo.longitude = sensor.geo.longitude;
    
        device.publish(topic, JSON.stringify(shadowDocument)); 
    
        console.log('published to shadow topic ' + topic + ' ' + JSON.stringify(shadowDocument));
    
        //publish new value readings based on value_rate
        setInterval(function(){

            //calculate randome values for each sensor reading
            msg.pH = RandomValue(50, 100) / 10;
            msg.temperature = RandomValue(480, 570) / 10;
            msg.salinity = RandomValue(200, 350) / 10;
            msg.disolvedO2 = RandomValue(40, 120) / 10;

            msg.timestamp = new Date().getTime();

            //publish the sensor reading message
            var topic = VALUE_TOPIC.replace('[thingName]', sensor.settings.clientId);

            device.publish(topic, JSON.stringify(msg)); 

            console.log('published to telemetry topic ' + topic + ' ' + JSON.stringify(msg));

        }, sensor.frequency);
    });

    device.on('error', function(error) {
        console.log('Error: ', error);
    });
}

function RandomValue (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//run simulation for each sensor
sensors.forEach((sensor) => {
    run(sensor);
})
