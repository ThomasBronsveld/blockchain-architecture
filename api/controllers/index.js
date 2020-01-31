const dockerJS = require('mydockerjs').docker;
const logger = require('../config/logger').logger;
const ajv = require('../config/validation').ajv;
const actionServices = require('../services/blockchain-network-services');

/**
 * Function responsible for checking if the machine has docker containers running. 
 * The return is a string so we parse it. 
 */
function checkRunningContainers() {
    return new Promise((resolve, reject) => {
        dockerJS.ps(function(err, dockerContainers) {
            if(err){
                console.log(err);
                logger.error(err);
                reject(err);
            }  
            else {
                resolve(JSON.parse(dockerContainers).length != 0);
            }
        });  
    });
}

/**
 * Function that starts the docker containers of our blockchain network. 
 * This function is going to run in the background during the first presentation.
 * 
 * @param {Request} req the incoming request.  
 * @param {Response} res the response we're sending to one who calls the endpoint. 
 */
async function addSinger(req){
    console.log(typeof req);
    let valid = ajv.validate('addSinger', req);
    if(!valid) {
        logger.error(req, ajv.errorsText());
        throw new Error(ajv.errorsText());
    }
    logger.info("Adding singer with these variables: " + req.name + req.recordLabel + req.iban + req.balance);
    //We need to build a check to see if the network is already running.
    let cont = await checkRunningContainers();
    try{
        if(cont) {
            console.log("hierzo");
            let response = await actionServices.addSingerToNetwork(req.name, req.recordLabel, req.iban, req.balance);
            console.log(response);
            return response;
        }        
        throw new Error("The network is offline")

    } catch(e){
        logger.error(e.message);
        return e.message;
    }
};

/**
 * Function that starts the docker containers of our blockchain network. 
 * This function is going to run in the background during the first presentation.
 * 
 * @param {Request} req the incoming request.  
 * @param {Response} res the response we're sending to one who calls the endpoint. 
 */
async function addRecordLabel(req){
    
    let valid = ajv.validate('addRecordLabel', req);
    if(!valid) {
        logger.error(req, ajv.errorsText());
        throw new Error(ajv.errorsText());
    }

    logger.info("Adding record label: " + req.name + " "+ req.iban);
    //We need to build a check to see if the network is already running.
    try{

        if(checkRunningContainers()) {
            let response = await actionServices.addRecordLabelToNetwork(req.name, req.iban);
            return response;
        }        
        throw new Error("The network is offline")

    } catch(e){
        logger.error(e.message);
        return e.message;
    }
};

/**
 * Function that starts the docker containers of our blockchain network. 
 * This function is going to run in the background during the first presentation.
 * 
 * @param {Request} req the incoming request.  
 * @param {Response} res the response we're sending to one who calls the endpoint. 
 */
async function addStreamingService(req){
    
    let valid = ajv.validate('addStreamingService', req);
    if(!valid) {
        logger.error(req, ajv.errorsText());
        throw new Error(ajv.errorsText());
    }

    logger.info("Adding streaming service: " + req.name + " "+ req.iban);
    //We need to build a check to see if the network is already running.
    try{

        if(checkRunningContainers()) {
            let response = await actionServices.addStreamingServiceToNetwork(req.name, req.iban);
            return response;
        }        
        throw new Error("The network is offline")

    } catch(e){
        logger.error(e.message);
        return e.message;
    }
};

/**
 * Function that starts the docker containers of our blockchain network. 
 * This function is going to run in the background during the first presentation.
 * 
 * @param {Request} req the incoming request.  
 * @param {Response} res the response we're sending to one who calls the endpoint. 
 */
async function addSong(req){
    
    let valid = ajv.validate('addSong', req);
    if(!valid) {
        logger.error(req, ajv.errorsText());
        throw new Error(ajv.errorsText());
    }

    logger.info("Adding song to the network: " + req.songName + " "+ req.singer +" "+ req.recordLabel);
    //We need to build a check to see if the network is already running.
    try{

        if(checkRunningContainers()) {
            let response = await actionServices.addSongToNetwork(req.songName,req.singer,req.recordLabel);
            return response;
        }        
        throw new Error("The network is offline")

    } catch(e){
        logger.error(e.message);
        return e.message;
    }
};

/**
 * Function that starts the docker containers of our blockchain network. 
 * This function is going to run in the background during the first presentation.
 * 
 * @param {Request} req the incoming request.  
 * @param {Response} res the response we're sending to one who calls the endpoint. 
 */
async function changeSong(req){
    
    logger.info("Changing song: " + req.songName + req.recordLabel);
    //We need to build a check to see if the network is already running.
    try{

        if(checkRunningContainers()) {
            let response = await actionServices.changeSongToNetwork(req.songName,req.recordLabel);            
            return response;
        }        
        throw new Error("The network is offline")

    } catch(e){
        logger.error(e.message);
        return e.message;
    }
};

async function getKey(req) {
    logger.info("Retrieving key from network: " + req.name);
    //We need to build a check to see if the network is already running.
    try{

        if(checkRunningContainers()) {
            let response = await setupServices.getKeyFromNetwork(name);
            return response;
        }        
        throw new Error("The network is offline")

    } catch(e){
        logger.error(e.message);
        return e.message;
    }
}

/**
 * Function that starts the docker containers of our blockchain network. 
 * This function is going to run in the background during the first presentation.
 * 
 * @param {Request} req the incoming request.  
 * @param {Response} res the response we're sending to one who calls the endpoint. 
 */
async function getAllAccounts(){
    
    logger.info("Retrieving all keys from network");
    //We need to build a check to see if the network is already running.
    try{

        if(checkRunningContainers()) {
            let response = await actionServices.getAllKeysFromNetwork();
            return response;
        }        
        throw new Error("The network is offline")

    } catch(e){
        logger.error(e.message);
        return e.message;
    }
};

/**
 * Function that starts the docker containers of our blockchain network. 
 * This function is going to run in the background during the first presentation.
 * 
 * @param {Request} req the incoming request.  
 * @param {Response} res the response we're sending to one who calls the endpoint. 
 */
async function changeRecordLabel(req){
    
    let valid = ajv.validate('changeRecordLabel', req);
    if(!valid) {
        logger.error(req, ajv.errorsText());
        throw new Error(ajv.errorsText());
    }

    logger.info("Chaging record label for singer: " + req.name + " to recordlabel: " + req.recordLabel);
    //We need to build a check to see if the network is already running.
    try{

        if(checkRunningContainers()) {
            let response = await actionServices.changeRecordLabel(req.recordLabel, req.name);
            return response;
        }        
        throw new Error("The network is offline")

    } catch(e){
        logger.error(e.message);
        return e.message;
    }
};

module.exports = {
    changeRecordLabel,
    getAllAccounts,
    getKey,
    changeSong,
    addSong,
    addStreamingService,
    addRecordLabel,
    addSinger
}

