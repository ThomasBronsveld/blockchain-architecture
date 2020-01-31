#The network

This network is build using the Hyperledger [Framework](https://hyperledger-fabric.readthedocs.io/en/latest/tutorials.html)

##Setting it up

The actual blockchain network can be started from the 
rest-api, therefore, all you have to do is generate the files required
for the network to run. This can be done by running 
`./generate.sh` in the network folder from your terminal. 
This generates all the files you need to run the network. 
The folder also comes with a `./start.sh` and `./down.sh` 
that start and tear down the network. The `./down.sh` is 
especially important because that wipes the blockchain network
of the information it has. This is useful when you want 
to start a clean new game. 