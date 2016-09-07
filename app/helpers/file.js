var fs = require('fs');
var path = require('path');





module.exports = {
  getFilePath: function(file, cb){
    var fp = path.join(__dirname, file);
    console.log('filepath '+ fp);
    fs.exists(fp, function(yes){
      if(yes){
        return cb(null, fp);
      }else{
        return cb('missing file' + fp);
      }
    });
  }
  ,
  downloadFile: function(res, file, newName, cb){
    res.download(file, newName);
  }

  /*
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

}*/
}
