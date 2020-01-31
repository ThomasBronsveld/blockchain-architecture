## The REST-API

This part of the repository serves as the communication point between the outside world and the blockchain network. 

This REST-API makes use of [socket-io](https://socket.io/) as its calling technique 

## Setup

To get the rest-api running locally, all you have to do is `$ npm install` and then run `$ npm start`


## Socket io events

This part includes a couple of socket io events and inputs that you can use to test the network 

| Event | Input | Listening event |
| --- | --- | --- |
| `addSinger` | {"name":"Jan Willem", "recordLabel":"HvA", "iban":"test", "balance":"100"} |`singerAdded` |
| `addRecordLabel` | {"name":"HvA","iban":"Ger"} | `recordLabelAdded`|
| `addStreamingService` | {"name":"Marcio","iban":"Bra"} | `streamingServiceAdded`|
| `addSong` | {"name":"Blockchain", "singer":"Jan Willem", "recordLabel":"HvA"} |`songAdded` |
| `getKey` | {"name":"Jan Willem"} | `keyRetrieved`|
| `getAllAccounts` |  | `singerAdded`| 
