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
async function transferMoney(sender, reciever, amount){
 
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
        const issueResponse = await contract.submitTransaction('transfer', sender, reciever, amount);
        // process response
        let rep = JSON.parse(issueResponse);
        return rep;    
    } catch (error) {
        return error;
    }
}
