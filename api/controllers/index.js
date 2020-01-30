const dockerJS = require('mydockerjs').docker;
const logger = require('../config/logger').logger;
const ajv = require('../config/validation').ajv;

/**
 * Function responsible for checking if the machine has docker containers running. 
 * The return is a string so we parse it. 
 */
function checkRunningContainers() {
    dockerJS.ps(function(err, dockerContainers) {
        if(err){
            console.log(err);
            logger.error(err);
            return err;
        }  
        else {
            console.log("here");
            console.log(JSON.parse(dockerContainers));
            return JSON.parse(dockerContainers).length == 0;
        }
      });  
}

