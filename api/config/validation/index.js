//Reading in all the validation schemas. Should be seperated into its own file tbh. Sorry about this, time issue :(

const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addSchema(moneyTransferschema, 'requestMoneyTransferSchema');
    
ajv.addSchema(moneyResponseSchema, 'responseSchemaMoneyTransfer');
    
ajv.addSchema(ResponseSentBalanceSchema, 'responseSentBalances');
    
ajv.addSchema(reponseRegisterWinnerSchema, 'responseRegisterWinner');
    
ajv.addSchema(requestRegisterWinnerSchema, 'requestRegisterWinner');
    
ajv.addSchema(responseGetWinnerSchema, 'responseGetWinner');

module.exports = {
    ajv
}