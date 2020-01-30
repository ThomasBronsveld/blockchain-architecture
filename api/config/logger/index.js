const log4js = require('log4js');
log4js.configure({
    appenders : {
        appLogger : {
            type : "dateFile",
            filename : './logs/app.log'
        }
    },
    categories : {
        default : {
            appenders : ['appLogger'],
            level : 'info' 
        }
    }
});

const logger = log4js.getLogger('appLogger');

module.exports = {
    logger
}
