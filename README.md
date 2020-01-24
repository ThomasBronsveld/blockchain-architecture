# blockchain-architecture
Repository for the course blockchain architecture of the Blockchain minor 2019 at the HvA.

## Use Case:


## Architecture Organization
How many peers and organisations?




## How consensus works?
The consensus mechanism in our blockchain network is based on the Byzantine fault tolerance. As the blockchain is decentralized, there needs a way to see when a new block or transaction is approved.
In our blockchain, this is that for every organization, at least one peer needs to approve. When this is done, a block or transaction is accepted. 
With a practical Byzantine Fault Tolerenace, the acceptance of transactions is done quicker and therefore easier. A downside however, is that every organization needs to approve, which could be a problem for some organizations. 


## Data and transaction model
In the diagram below you see the process how an artist earn money from streaming services. For this use case we have created a private permissioned blockchain network that includes organizations such as Spotify (streaming service), record label and the tax authority. In this use case the song of an artist is the asset. A song contains several elements namely, the artist who wrote/sing the song and the record label that produces it. When a song is played it will invoke a smart contract that will distribute the earnings based on percentage to the record label and artist. It will also update your yearly income with the tax authority.  

![Image of Data Flow](https://user-images.githubusercontent.com/26054730/73069116-318fe680-3ead-11ea-9087-7f8caf6631e1.png)

In this private permissioned blockchain network consist of three main components; the participants, assets and transactions. 
Participants: Record Label, Streaming services and Tax Authority
Assets: The song produced by the record label in collaboration with the artist. 
Transactions: These actions will change the world state. Add/Remove/Update Artist, Produce Music, Add/Remove Song, Promote Music, Per-Play Royalty, Update Income with tax authority

![Image of Transaction Model](https://user-images.githubusercontent.com/26054730/73071971-5b98d700-3eb4-11ea-8a4a-67ea8059ac82.png)


![Image of Data Model](https://user-images.githubusercontent.com/26054730/73063934-49ad3900-3ea0-11ea-81ab-6587c67c5c63.png)


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
How the blockchain network interact with external systems (calls and events)?


## Network hosting
During this project we will be hosting our Hyperledger on Digital Ocean. We have chosen for this cloud-based solution, because it was not possible to configure Hyperledger on every laptop. Therefore, we have chosen for this option so everyone can access the Hyperledger and work on it. For the configuration of our Digital Ocean environment we have followed this guide (see link) 
<https://medium.com/@eplt/5-minutes-to-install-hyperledger-fabric-v1-3-on-ubuntu-18-04-digitalocean-a06541a2ba45>

The key selling points of Digital Ocean are: simplicity, pricing, and high-performance virtual servers. It provides a quick and easy setup for small developers and has a user-friendly, clean interface with features with one-click deployments. It is also known for providing high-performance servers. All their hard disks are SSD and got an incredible start-up time of only 55 sec. You can also choose which datacenter you want to use. Digital Ocean got 9 data centers positioned in San Francisco, Singapore, Amsterdam, New York and London. In this case we of course choose for the datacenter in Amsterdam, so we can ensure optimal connection speed.  


## Privacy and security
Authentication and Authorisation


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
