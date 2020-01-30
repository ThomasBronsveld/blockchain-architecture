'use strict';

const path = require('path');
const fs = require('fs');
const {FileSystemWallet} = require('fabric-network');

const ccpPath = path.resolve(process.cwd(), 'ccp','connection-bc.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);
        
const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

const gatewayDiscovery = config.gatewayDiscovery;
const admin = config.appAdmin;
const orgMSPID = config.orgMSPID;

module.exports = {
    ccp,
    gatewayDiscovery,
    admin,
    orgMSPID,
    wallet
}
