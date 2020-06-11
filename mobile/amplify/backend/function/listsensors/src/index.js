const AWS = require('aws-sdk');
const iotClient = new AWS.Iot();

var region = process.env.REGION;

AWS.config.update({
    region: region
});

exports.handler = async (event) => {

    var resultArray = [];

    //query all sensors that have reported a shadow and of type water quality sensor
    //you must have fleet indexing enabled in IoT Core with REGISTRY_AND_SHADOW indexed
    
    var params = {
        queryString: 'shadow.reported.name:* AND thingTypeName:WATER_QUALITY_SENSOR'
    };

    try {

        var result = await iotClient.searchIndex(params).promise();

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
