const {
    IoTClient,
    SearchIndexCommand
} = require("@aws-sdk/client-iot");

const iotClient = new IoTClient();

exports.handler = async (event) => {

    var resultArray = [];

    //query all sensors that have reported a shadow and of type water quality sensor
    //you must have fleet indexing enabled in IoT Core with REGISTRY_AND_SHADOW indexed
    
    var params = {
        queryString: 'shadow.reported.name:* AND thingTypeName:WATER_QUALITY_SENSOR'
    };

    var command = new SearchIndexCommand(params);

    try {

        var result = await iotClient.send(command)

        //build an array of the thing shadow values and return array
        result.things.forEach(element => {
            
            var shadow = JSON.parse(element.shadow);

            shadow.reported.sensorId = element.thingName;
            
            resultArray.push(shadow.reported);
        });

        return resultArray;
    }
    catch (err) {

        console.log("error: " + err);
        throw err;
    }
};