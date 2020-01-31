//Initialize some variables that we need to perform the actions of our services. 
const path = require('path');
const fs = require('fs');
const networkConfig = require('../../config/');
const {Gateway } = require('fabric-network');
const wallet = networkConfig.wallet;

const userName = networkConfig.admin;
const gatewayDiscovery = networkConfig.gatewayDiscovery;
const cpp = networkConfig.ccp;

// /**
//  * 
//  * @param {String} sender | the sender, needs to be an IBAN  
//  * @param {String} reciever | the reciever, needs to be an IBAN
//  * @param {String} amount | amount of money to be transferred. 
//  */
async function addSingerToNetwork(name,recordLabel,iban,balance){
    console.log("test");
    try {
        const gateway = new Gateway();
    
        // Connect to gateway using application specified parameters
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: gatewayDiscovery
        };

        await gateway.connect(cpp, connectionOptions);
        
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to the contract
        const contract = await network.getContract('mycc');
        // query the ledger
        const issueResponse = await contract.submitTransaction('addSinger', name, recordLabel, iban, balance);
        // process response
        let rep = JSON.parse(issueResponse);        
        return rep;    
    } catch (error) {
        return error;
    }
}

// /**
//  * 
//  * @param {String} sender | the sender, needs to be an IBAN  
//  * @param {String} reciever | the reciever, needs to be an IBAN
//  * @param {String} amount | amount of money to be transferred. 
//  */
async function addRecordLabelToNetwork(name,iban){
 
    try {
        const gateway = new Gateway();
    
        // Connect to gateway using application specified parameters
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: gatewayDiscovery
        };

        await gateway.connect(cpp, connectionOptions);
        
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to the contract
        const contract = await network.getContract('mycc');
        // query the ledger
        const issueResponse = await contract.submitTransaction('addRecordLabel', name,iban);
        // process response
        let rep = JSON.parse(issueResponse);
        return rep;    
    } catch (error) {
        return error;
    }
}

// /**
//  * 
//  * @param {String} sender | the sender, needs to be an IBAN  
//  * @param {String} reciever | the reciever, needs to be an IBAN
//  * @param {String} amount | amount of money to be transferred. 
//  */
async function addStreamingServiceToNetwork(name,iban){
 
    try {
        const gateway = new Gateway();
    
        // Connect to gateway using application specified parameters
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: gatewayDiscovery
        };

        await gateway.connect(cpp, connectionOptions);
        
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to the contract
        const contract = await network.getContract('mycc');
        // query the ledger
        const issueResponse = await contract.submitTransaction('addStreamingService', name,iban);
        // process response
        let rep = JSON.parse(issueResponse);
        return rep;    
    } catch (error) {
        return error;
    }
}

// /**
//  * 
//  * @param {String} sender | the sender, needs to be an IBAN  
//  * @param {String} reciever | the reciever, needs to be an IBAN
//  * @param {String} amount | amount of money to be transferred. 
//  */
async function addSongToNetwork(name,iban){
 
    try {
        const gateway = new Gateway();
    
        // Connect to gateway using application specified parameters
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: gatewayDiscovery
        };

        await gateway.connect(cpp, connectionOptions);
        
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to the contract
        const contract = await network.getContract('mycc');
        // query the ledger
        const issueResponse = await contract.submitTransaction('addSong', songName,singer,recordLabel);
        // process response
        let rep = JSON.parse(issueResponse);
        return rep;    
    } catch (error) {
        return error;
    }
}

// /**
//  * 
//  * @param {String} sender | the sender, needs to be an IBAN  
//  * @param {String} reciever | the reciever, needs to be an IBAN
//  * @param {String} amount | amount of money to be transferred. 
//  */
async function changeSongToNetwork(songName,singer,recordLabel){
 
    try {
        const gateway = new Gateway();
    
        // Connect to gateway using application specified parameters
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: gatewayDiscovery
        };

        await gateway.connect(cpp, connectionOptions);
        
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to the contract
        const contract = await network.getContract('mycc');
        // query the ledger
        const issueResponse = await contract.submitTransaction('changeSong', songName,recordLabel);
        // process response
        let rep = JSON.parse(issueResponse);
        return rep;    
    } catch (error) {
        return error;
    }
}

// /**
//  * 
//  * @param {String} sender | the sender, needs to be an IBAN  
//  * @param {String} reciever | the reciever, needs to be an IBAN
//  * @param {String} amount | amount of money to be transferred. 
//  */
async function changeSongToNetwork(songName,singer,recordLabel){
 
    try {
        const gateway = new Gateway();
    
        // Connect to gateway using application specified parameters
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: gatewayDiscovery
        };

        await gateway.connect(cpp, connectionOptions);
        
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to the contract
        const contract = await network.getContract('mycc');
        // query the ledger
        const issueResponse = await contract.submitTransaction('changeSong', songName,recordLabel);
        // process response
        let rep = JSON.parse(issueResponse);
        return rep;    
    } catch (error) {
        return error;
    }
}

// /**
//  * 
//  * @param {String} sender | the sender, needs to be an IBAN  
//  * @param {String} reciever | the reciever, needs to be an IBAN
//  * @param {String} amount | amount of money to be transferred. 
//  */
async function getKeyFromNetwork(name){
 
    try {
        const gateway = new Gateway();
    
        // Connect to gateway using application specified parameters
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: gatewayDiscovery
        };

        await gateway.connect(cpp, connectionOptions);
        
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to the contract
        const contract = await network.getContract('mycc');
        // query the ledger
        const issueResponse = await contract.submitTransaction('getKey',name);
        // process response
        let rep = JSON.parse(issueResponse);
        return rep;    
    } catch (error) {
        return error;
    }
}

// /**
//  * 
//  * @param {String} sender | the sender, needs to be an IBAN  
//  * @param {String} reciever | the reciever, needs to be an IBAN
//  * @param {String} amount | amount of money to be transferred. 
//  */
async function getAllKeysFromNetwork(){
 
    try {
        const gateway = new Gateway();
    
        // Connect to gateway using application specified parameters
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: gatewayDiscovery
        };

        await gateway.connect(cpp, connectionOptions);
        
        const network = await gateway.getNetwork('mychannel');
        // Get addressability to the contract
        const contract = await network.getContract('mycc');
        // query the ledger
        const issueResponse = await contract.submitTransaction('getAllAccounts');
        // process response
        let rep = JSON.parse(issueResponse);
        return rep;    
    } catch (error) {
        return error;
    }
}

module.exports = {
    addSingerToNetwork,
    getAllKeysFromNetwork,
    getKeyFromNetwork,
    changeSongToNetwork,
    addSongToNetwork,
    addStreamingServiceToNetwork,
    addRecordLabelToNetwork,
    addSingerToNetwork
}
