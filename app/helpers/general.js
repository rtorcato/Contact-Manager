var Mailgun = require('mailgun-js');
const url = require("url");
var fs = require("fs");

module.exports = {
    // Generic error handler used by all endpoints.
    handleError: function(res, reason, message, code) {
        console.log("ERROR: " + reason);
        res.status(code || 500).json({ "error": message });
    },
    parseURL: function(url) {
        var parsedURL = url.parse("http://www.example.com/profile?name=barry");
        console.log(parsedURL.protocol); // "http:"
        console.log(parsedURL.host); // "www.example.com"
        console.log(parsedURL.query); // "name=barry"
    },
    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    },
    randomString: function(length) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    },
    randomInteger: function(max) {
        //A function that returns a random integer between 0 and 100
        return Math.floor((Math.random() * max));
    },
    getFile: function(filePath) {
        var options = { encoding: "utf-8" }
        fs.readFile("myfile.txt", options, function(err, data) {
            if (err) {
                console.error("Error reading the file");
                return;
            }
            console.log(data.match(/x/gi).length + " letter X's");
        });
    },

}
