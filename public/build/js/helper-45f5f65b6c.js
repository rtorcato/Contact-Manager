
/*!
/**=========================================================
 * Helper Functions
 =========================================================*/
 var BrowserDetect = {
         init: function () {
             this.browser = this.searchString(this.dataBrowser) || "Other";
             this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
         },
         searchString: function (data) {
             for (var i = 0; i < data.length; i++) {
                 var dataString = data[i].string;
                 this.versionSearchString = data[i].subString;

                 if (dataString.indexOf(data[i].subString) !== -1) {
                     return data[i].identity;
                 }
             }
         },
         searchVersion: function (dataString) {
             var index = dataString.indexOf(this.versionSearchString);
             if (index === -1) {
                 return;
             }

             var rv = dataString.indexOf("rv:");
             if (this.versionSearchString === "Trident" && rv !== -1) {
                 return parseFloat(dataString.substring(rv + 3));
             } else {
                 return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
             }
         },

         dataBrowser: [
             {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
             {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
             {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
             {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
             {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
             {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

             {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
             {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
         ]
     };

     BrowserDetect.init();

///My Simple Site call API
function call_API(pFunctionName, pParams, pCallBack){
  var pURL = window.baseURL+'api/'+pFunctionName; ///don't add forward slash it screws up laravel
 // pParams = {key1: 'rtorcato@me.com', key2: 'value2'}
  var pResponseObj = {};
  //, dataType: 'json'
  $.ajax({
        type: 'POST', url: pURL, data: pParams,
        success: function (pResponse) {
          pResponseObj.response = pResponse;
          if (pResponse.indexOf('A PHP Error was encountered') !== -1){
            console.log(pResponse);
            pResponseObj.status = 'error'
            pResponseObj.message = "PHP error: "+pResponse;
            pCallBack(pResponseObj);
            return;
          }
          //console.log(pResponse);
          try{
         pResponseObj = JSON.parse(pResponse);
      } catch(err){
        pResponseObj.status = 'error'
            pResponseObj.message = "JSON parse error:"+err;
            console.log(pResponseObj.message);
      }
           if (pCallBack && typeof(pCallBack) === "function") {
            // execute the callback, passing parameters as necessary
            pCallBack(pResponseObj);
          }
        },
        statusCode: {
          404: function() {
            pResponseObj.status = 'error'
            pResponseObj.message = "404 - Page Not Found";
            pResponseObj.response = '';
            console.log(pResponseObj.message);
            if (pCallBack && typeof(pCallBack) === "function") {
              pCallBack(pResponseObj);
            }
          }
      },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          pResponseObj.status = 'error';
          pResponseObj.message = "Error Occurred! " + errorThrown;
          pResponseObj.response = '';
          console.log(pResponseObj.message);
          if (pCallBack && typeof(pCallBack) === "function") {
            // execute the callback, passing parameters as necessary
            pCallBack(pResponseObj);
          }
        }
  });
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// iPad and iPod detection
var isiPad = function(){
  return (navigator.platform.indexOf("iPad") != -1);
};

var isiPhone = function(){
    return (
    (navigator.platform.indexOf("iPhone") != -1) ||
    (navigator.platform.indexOf("iPod") != -1)
    );
};
