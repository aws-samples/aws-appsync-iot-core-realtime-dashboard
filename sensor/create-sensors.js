process.env.AWS_SDK_LOAD_CONFIG = true;

const AWS = require('aws-sdk');
const fs = require('fs');
const async = require('async');
const https = require('https');

//if a region is not specified in your local AWS config, it will default to us-east-1
const REGION = AWS.config.region || 'us-east-1';

//if you wish to use a profile other than default, set an AWS_PROFILE environment variable when you run this app
//for example:
//AWS_PROFILE=my-aws-profile node create-sensor.js
const PROFILE = process.env.AWS_PROFILE || 'default';

//constants used in the app - do not change
const SETTINGS_FILE = './settings.json';
const CERT_FOLDER = './certs/';
const POLICY_FILE = './policy.json';
const ROOT_CA_FILE = 'AmazonRootCA1.pem';
const ROOT_CA_URL = "https://www.amazontrust.com/repository/AmazonRootCA1.pem";

//open sensor app and mobile app settings files
var settings = require(SETTINGS_FILE);

//use the credentials from the AWS profile
var credentials = new AWS.SharedIniFileCredentials({profile: PROFILE});
AWS.config.credentials = credentials;

AWS.config.update({
    region: REGION
});

//store consolidated results from various functions
var results = {
  uid: new Date().getTime(),
  policyArn: "",
  policyName: "",
  certificateArn: "",
  certificatePem: "",
  privateKey: ""
}

var iot = new AWS.Iot();

//create a unique thing name
settings.clientId = "sensor-" + results.uid;

async.series([
    function(callback) {

        // get the regional IOT endpoint
        var params = { endpointType: 'iot:Data-ATS'};
    
        iot.describeEndpoint(params, function(err, data) {
          
          if (err) {callback(err);}
          else {
  
            settings.host = data.endpointAddress;
            callback();
          }

        });
    },
    function(callback) {

      //create the IOT policy
      var policyDocument = require(POLICY_FILE);
      results.policyName = 'Policy-' + results.uid;

      var policy = { policyName: results.policyName, policyDocument: JSON.stringify(policyDocument)};
    
      iot.createPolicy(policy, function(err, data) {
        
        if (err) {callback(err);}
        else {
          results.policyArn = data.policyArn;
          callback();
        }

      });
    },
    function(callback) {

      //create the certificates
      iot.createKeysAndCertificate({setAsActive:true}, function(err, data) {
        
        if (err) {callback(err);}
        else {

          results.certificateArn = data.certificateArn;
          results.certificatePem = data.certificatePem;
          results.privateKey = data.keyPair.PrivateKey;
  
          callback();
        }

      });
    },
    function(callback) {
        
      //save the certificate
        var fileName = CERT_FOLDER + settings.clientId + '-certificate.pem.crt';
        
        settings.certPath = fileName;

        fs.writeFile(fileName, results.certificatePem, (err) => {
          
          if (err) {callback(err);}
          else {
            callback();
          }

        });

    },
    function(callback) {

        //save the private key
        var fileName = CERT_FOLDER + settings.clientId + '-private.pem.key';

        settings.keyPath = fileName;

        fs.writeFile(fileName, results.privateKey, (err) => {
          
          if (err) {callback(err);}
          else {
            callback();
          }

        });

    },
    function(callback) {
      
      //save the AWS root certificate
      settings.caPath = CERT_FOLDER + ROOT_CA_FILE;

      var file = fs.createWriteStream(settings.caPath);
      var request = https.get(ROOT_CA_URL, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close();
          callback();
        });
      });

    },
    function(callback) {

      //create the thing
      iot.createThing({thingName: settings.clientId}, function(err, data) {
        
        if (err) {callback(err);}
        else {
          callback();
        }

      });
    },
    function(callback) {

      //attach policy to certificate
      iot.attachPolicy({ policyName: results.policyName, target: results.certificateArn}, function(err, data) {
        
        if (err) {callback(err);}
        else {
          callback();
        }
        
      });
    },
    function(callback) {

      //attach thing to certificate
      iot.attachThingPrincipal({thingName: settings.clientId, principal: results.certificateArn}, function(err, data) {
        
        if (err) {callback(err);}
        else {
          callback();
        }
        
      });
    },
    function(callback) {

        //save the updated settings file
        let data = JSON.stringify(settings, null, 2);

        fs.writeFile(SETTINGS_FILE, data, (err) => {
          if (err) { callback(err) }
          else {
            callback();
          }
        });
    }
  ],
  function(err, results) {
    if (err){
      console.error ("ERROR: " + err.message);
    } else {
      console.log('IOT device provisioned');
      console.log('ID: ' + settings.clientId);
      console.log('AWS Region: ' + REGION);
      console.log('AWS Profile: ' + PROFILE);
    }
});