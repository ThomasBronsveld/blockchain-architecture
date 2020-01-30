/*
 * Chaincode for the music industry use case
 *
 * Author: Kevin
 *
 * disclaimer: fabric-examples were used as a basis for building this code
 */

'use strict';

const {Contract} = require('fabric-contract-api');

class AccountContract extends Contract {
    
/* Adding of a singer with a name, recordlabel and iban with balance.*/
    async addSinger(ctx,name,recordLabel,iban,balance) {
        let singer = {
            'name':name,
            'recordLabel':recordLabel,
            'iban':iban,
            'balance':balance
        }
        await ctx.stub.putState(name,Buffer.from(JSON.stringify(singer)));
        console.log('singer added with success');
    }

/*Changing record label for singer from record label a to record label b*/
    async changeRecordLabel(ctx,b,singer) {
       singer.recordLabel = b;
    }

/*Adding recordlabel with name and iban*/
    async addRecordLabel(ctx,name,iban)  {
        let recordLabel = {
            'name':name,
            'iban':iban
        }
        await ctx.stub.putState(name,Buffer.from(JSON.stringify(recordLabel)));
        console.log('record label added with success');
    }

/*Adding streaming service with name and iban*/
    async addStreamingService(ctx,name,iban) {
        let streamingService = {
            'name':name,
            'iban':iban
        }
        await ctx.stub.putState(name,Buffer.from(JSON.stringify(streamingService)));
        console.log('streaming service added with success');
    }

/*Adding song with name, singer and record label*/
    async addSong(ctx,name,singer,recordLabel)  {
        let song = {
            'name':name,
            'singer':singer,
            'recordLabel':recordLabel
        }
        await ctx.stub.putState(name,Buffer.from(JSON.stringify(song)));
        console.log('song added with success');
    }

/*Changing song from record label a to record label b*/

    async changeSong(ctx,name,b)  {
        song.recordLabel = b;
    }
        
/*Getting singer*/
    async getSinger(ctx,name) {
        console.info('querying for name: ' + name);
        let returnAsBytes = await ctx.stub.getState(name);
        let result = JSON.parse(returnAsBytes);
        return JSON.stringify(result);
    }

/*Getting record label*/
    async getRecordLabel(ctx,name)  {
        console.info('querying for record label: ' + recordLabel);
        let returnAsBytes = await ctx.stub.getState(recordLabel);
        let result = JSON.parse(returnAsBytes);
        return JSON.stringify(result);
    }

/*Getting streaming service*/
    async getStreamingService(ctx,name) {
        console.info('querying for record label: ' + streamingService);
        let returnAsBytes = await ctx.stub.getState(streamingService);
        let result = JSON.parse(returnAsBytes);
        return JSON.stringify(result);
    }

/*Getting song*/
    async getSong(ctx,name) {
        console.info('querying for song: ' + song);
        let returnAsBytes = await ctx.stub.getState(song);
        let result = JSON.parse(returnAsBytes);
        return JSON.stringify(result);
    }

/*niets aangepast. Hoe zet ik de variable erin van singer, record label etc.*/
    async getAllAccounts(ctx) {
        const iterator = await ctx.stub.getStateByRange('','');

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

/* listening to song*/

    async   listeningToSong(ctx,song,streamingService,quantity)   {
        
        let listeningSong = new listeningSong(streamingService,song);
        let key = listeningSong.getType() + ":" + listeningSong.getOriginId()
    }

/* dividing royalties between singer and record label  */
    async (ctx,singer, recordLabel,amount)  {
        
    }
}

module.exports = AccountContract;