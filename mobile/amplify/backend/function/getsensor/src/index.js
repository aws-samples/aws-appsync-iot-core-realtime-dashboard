const AWS = require('aws-sdk');
const iotClient = new AWS.Iot();

var region = process.env.REGION;

AWS.config.update({
    region: region
});

exports.handler = async (event) => {

    //query for the sensor confirming it has a reported shadow
    //you must have fleet indexing enabled in IoT Core with REGISTRY_AND_SHADOW indexed

    const sensorId = event.arguments.sensorId || "";

    try {

        var params = {
            queryString: 'shadow.reported.name:* AND thingName:' + sensorId
        };

        var result = await iotClient.searchIndex(params).promise();

        if (result.things.length > 0) {

            var element = result.things[0];

            var shadow = JSON.parse(element.shadow);
    
            shadow.reported.sensorId = element.thingName;
    
            return shadow.reported;

        } else {

            throw new Error("Sensor not found:" + sensorId);
        }
    }
    catch (err) {

        console.log("error: " + err);
        throw new Error("Error retrieving sensor: " + sensorId);
    }
};
