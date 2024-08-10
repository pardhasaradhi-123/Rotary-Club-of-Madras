const path = require("path");
const bunyan = require("bunyan");

// favour using env variables to provide your code with external configs
// it makes it a lot simpler when you want to change the configs
const level = process.env.NODE_LOGGING_LEVEL || "info";

var log = bunyan.createLogger({
    name: 'Rotarat',
    streams: [
        {
            level: 'info',
            stream: process.stdout            // log INFO and above to stdout
        },
        {
            level: 'info',
            path: path.resolve(__dirname, "logs.json")  // log INFO and above to a file
        },
        {
            level: 'error',
            path: path.resolve(__dirname, "error.json")  // log INFO and above to a file
        }
    ]
});

module.exports = log;