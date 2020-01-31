//Reading in all the validation schemas. Should be seperated into its own file tbh. Sorry about this, time issue :(

const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv();

let addRecordLabel = JSON.parse(fs.readFileSync('./resources/schemas/addRecordLabel.json', 'utf8'));
let addSinger = JSON.parse(fs.readFileSync('./resources/schemas/addSinger.json', 'utf8'));
let addSong = JSON.parse(fs.readFileSync('./resources/schemas/addSong.json', 'utf8'));
let addStreamingService = JSON.parse(fs.readFileSync('./resources/schemas/addStreamingService.json', 'utf8'));
let changeRecordLabel = JSON.parse(fs.readFileSync('./resources/schemas/changeRecordLabel.json', 'utf8'));

ajv.addSchema(addRecordLabel, 'addRecordLabel');
    
ajv.addSchema(addSinger, 'addSinger');
    
ajv.addSchema(addSong, 'addSong');
    
ajv.addSchema(addStreamingService, 'addStreamingService');
    
ajv.addSchema(changeRecordLabel, 'changeRecordLabel');

module.exports = {
    ajv
}