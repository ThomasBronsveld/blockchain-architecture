# blockchain-architecture
Repository for the course blockchain architecture of the Blockchain minor 2019 at the HvA.

## Use Case:


## Architecture Organization
How many peers and organisations?
How consensus/endorsement works in your network



## How consensus works?
The consensus mechanism in our blockchain network is based on the Byzantine fault tolerance. As the blockchain is decentralized, there needs a way to see when a new block or transaction is approved.
In our blockchain, this is that for every organization, at least one peer needs to approve. When this is done, a block or transaction is accepted. 
With a practical Byzantine Fault Tolerenace, the acceptance of transactions is done quicker and therefore easier. A downside however, is that every organization needs to approve, which could be a problem for some organizations. 


## Data and transaction model
How participants, assets and transactions are modelled?


## Logic:
- What are the business rules?
In this case we use music as an example. An artist makes a song. A record label pays money to promote this song. When somebody uses a streaming service to listen, a smart contract is called upon that the streaming service has with the record label. In this contract, the division of costs are mentioned. A certain amount goes to the artist some goes to the label.
- which events are generated?
* Add/remove/update artist
* Add/remove song
* per-played royalties
* produce music
* promote music


## Integration
How the blockchain network interact with external systems (calls and events)?


## Network hosting
What is the chosen hosting strategy?

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
