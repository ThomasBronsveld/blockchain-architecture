# blockchain-architecture
Repository for the course blockchain architecture of the Blockchain minor 2019 at the HvA.

## Use Case:
Since the beginning of this century men is actively changing his way of storing data from analog to digital. Books and encyclopedias are disappearing and everything is stored on machines. This is happening everywhere and with everything. When did u last bought a CD for example. 
The way songs and albums where stored changed a lot the past decades. From LP’s to CD’s to a file on your pc. This chance gave a lot of problems for the artists and their record labels. Most revenue came from sales of records and albums. Since we were able to store songs ourselves as files and share them online record labels lost a lot of sales. This started a period where lots of songs where shared without owners giving permission to this. Pirating digital content became a real problem and a lot of sites emerged that couldn’t be stopped from doing it. 

Streaming services
Instead of working against it companies started improving streaming services and new ones were founded. The rise of the streaming services is in line with the decrease of pirate sites and illegal downloads. Streaming services provide an easy way of listening to songs for a low amount of money. They obey the the rules and laws so the record labels and the artists get their share of royalties.
This ended a lot of issues with the illegal activities of pirating but also brought new problems. Artist wouldn’t getting paid per sold album or song since there were so little. It will now depend on the amount of listeners per streaming service. Because their are so many streaming services and even more listeners this also gives a lot of problems for the record labels, organising their contracts with different streaming services per each artist. All this is very complicated to have properly organised and this where a Hyperledger Fabric network can really be used to its full potential.

Network
This network will provide a framework for record labels to easily use when setting up new contracts. this can be done with new artists or with new streamings services that wants to use their music. Whenever users of streaming services listen to a song, a transaction takes place in the blockchain. Als the production of songs and the promotion of songs are transaction that can take place in this network. 
Beside the easily useable contracts that are provide this network also gives a form of privacy for its artist. Whenever a song is listen to an amount of money will be send to the artist of the song. The amount of money can be different per artists. This could depend on the popularity of an artist or on the amount of songs produced. This is private information and shouldn’t be shared by the artists or the record labels. Within this network its safely secured and only the artists that are involved gets to know the information. 
Lastly the contracts can be set up in such a way the royalties get pay out instantly. Whenever a song a part of a song or an amount of songs is listen to its artist get his royalties paid out. This depends on the contracts that has been set up and could differ per artists.


Future
This systems takes care of the organisation of all the contracts within one record label. This can easily be expanded to more artists and for more record labels. The great thing about this network is that it is well organized. Personal data is carefully stored and it provides an pay out whenever songs are listen to. This takes away a lot of work for the record labels controlling and maintaining contracts as it now all goes automatically. Record labels itself also get their share of the royalties and it will only benefit their company. 
since the beginning of the century a different chances and steps took place in storing data and automating system, this is one that should be taken next.


## Architecture Organization

Our network consists of a single organisation with two peers. We've tried to make it work with three organisations and two peers each, however, we ran into an issue that we couldn't solve in time for this deadline. For the next deadline we intend to upgrade the network into a more diverse network with the three organisations and two peers each. 

## How consensus works?
The consensus mechanism in our blockchain network is based on the Byzantine fault tolerance. As the blockchain is decentralized, there needs a way to see when a new block or transaction is approved.
In our blockchain, this is that for every organization, at least one peer needs to approve. When this is done, a block or transaction is accepted. 
With a practical Byzantine Fault Tolerenace, the acceptance of transactions is done quicker and therefore easier. A downside however, is that every organization needs to approve, which could be a problem for some organizations. 


## Data and transaction model
In the diagram below you see the process how an artist earn money from streaming services. For this use case we have created a private permissioned blockchain network that includes organizations such as Spotify (streaming service), record label and the tax authority. In this use case the song of an artist is the asset. A song contains several elements namely, the artist who wrote/sing the song and the record label that produces it. When a song is played it will invoke a smart contract that will distribute the earnings based on percentage to the record label and artist. It will also update your yearly income with the tax authority.  

![Image of Data Flow](https://user-images.githubusercontent.com/26054730/73069116-318fe680-3ead-11ea-9087-7f8caf6631e1.png)

In this private permissioned blockchain network consist of three main components; the participants, assets and transactions. 
* Participants: Record Label, Streaming services and Tax Authority
* Assets: The song produced by the record label in collaboration with the artist. 
* Transactions: These actions will change the world state. Add/Remove/Update Artist, Produce Music, Add/Remove Song, Promote Music, Per-Play Royalty, Update Income with tax authority

![Image of Transaction Model](https://user-images.githubusercontent.com/26054730/73071971-5b98d700-3eb4-11ea-8a4a-67ea8059ac82.png)

In the figure below you will see the interaction with the client. The client is responsible to submit the transactions to the peers. In this case the client submits the played song to the record label. When the transaction is endorsed it will send to the transaction to the orderer, which make the transaction, and distribute to other peers. To end things up it will send events back to the client with the results of the transactions. 

![Image of Client Interaction](https://user-images.githubusercontent.com/26054730/73063934-49ad3900-3ea0-11ea-81ab-6587c67c5c63.png)


## Logic:
- What are the business rules?
In this case we use music as an example. An artist makes a song. A record label pays money to promote this song. When somebody uses a streaming service to listen, a smart contract is called upon that the streaming service has with the record label. In this contract, the division of costs are mentioned. A certain amount goes to the artist some goes to the label.

To add to this, another organization is added, which is the tax authorities. They also get a small amount of money of every streaming, depending on how much money an artist gets.

The following events are generated:
* Add/remove/update artist
* Add/remove song
* Per-played royalties
* Produce music
* Promote music
* Money to tax authority


## Integration

We made use of [socket-io](https://socket.io/) to listen to events once people are connected to our REST-API. We also emit some events so that we can update the users with the result of their launched event. 

## Network hosting
During this project we will be hosting our Hyperledger on Digital Ocean. We have chosen for this cloud-based solution, because it was not possible to configure Hyperledger on every laptop. Therefore, we have chosen for this option so everyone can access the Hyperledger and work on it. For the configuration of our Digital Ocean environment we have followed this [guide](https://medium.com/@eplt/5-minutes-to-install-hyperledger-fabric-v1-3-on-ubuntu-18-04-digitalocean-a06541a2ba45)


The key selling points of Digital Ocean are: simplicity, pricing, and high-performance virtual servers. It provides a quick and easy setup for small developers and has a user-friendly, clean interface with features with one-click deployments. It is also known for providing high-performance servers. All their hard disks are SSD and got an incredible start-up time of only 55 sec. You can also choose which datacenter you want to use. Digital Ocean got 9 data centers positioned in San Francisco, Singapore, Amsterdam, New York and London. In this case we of course choose for the datacenter in Amsterdam, so we can ensure optimal connection speed.  


## Privacy and security

For this deadline we decided to just get a working proof of concept going, so we don't much in the terms of authorization and authentication. We have setup a request validation that checks the contents of the request. 

We intend to update this part to SSI in the near future. 

## Individual contribution table:
| Subject:	                          | Person:    |
| :---------------------------------: | ----------:|
| Use case	                          | Jan-Willem |
| Architecture Organization 	        | Jan-Willem |
| Consensus	                          | Kevin      |
| Data and transaction model	        | Kashing    |
| Logic     	                        | Kevin      |
| Integration	                        | Thomas     |
| Network Hosting	                    | Kashing    |
| Privacy & security	                | Thomas     |
