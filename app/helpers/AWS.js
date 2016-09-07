var AWS = require('aws-sdk');
var fs = require('fs');
var zlib = require('zlib');
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_SECURE_BUCKET= process.env.AWS_SECURE_BUCKET;
//winston.level = process.env.LOG_LEVEL ;
//const winston = require('winston');
function setupAWS(){
  // Set your region for future requests.
  AWS.config.region = process.env.AWS_REGION;
  AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  //"region": "sa-east-1"   <- If you want send something to your bucket, you need take off this settings, because the S3 are global.
  });
}
module.exports = {
createBucket: function(bucketName) {
    setupAWS();
    // Create a bucket using bound parameters and put something in it.
    // Make sure to change the bucket name from "myBucket" to something unique.
    var s3bucket = new AWS.S3({ params: { Bucket: bucketName } });
    s3bucket.createBucket(function() {
        var params = { Key: 'myKey', Body: 'Hello!' };
        s3bucket.upload(params, function(err, data) {
            if (err) {
                console.log("Error uploading data: ", err);
            } else {
                console.log("Successfully uploaded data to myBucket/myKey");
            }
        });
    });
}
}
//https://devcenter.heroku.com/articles/s3-upload-node
