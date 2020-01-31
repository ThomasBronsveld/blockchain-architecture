#!/bin/bash
#
# Author: MFK and Thomas
# Based on the hyperledger fabric documentation and fabric-samples
#
# This script starts a hyperledger fabric network with one orgs, five peers
#


# setting common environment variables
../common/setenv.sh

# clean the keystore
rm -rf ./hfc-key-store

# starting all containers (peers, ca, couchdb)
# docker-compose -f docker-compose-cli.yaml -f docker-compose-ca.yaml -f docker-compose-couch.yaml up -d

docker-compose \
    -f docker-compose-cli.yaml \
    -f docker-compose-ca.yaml \
    -f docker-compose-couch.yaml up -d \
    orderer.arch.nl \
    peer0.org1.arch.nl \
    peer1.org1.arch.nl \
    peer0.org2.arch.nl \
    peer1.org2.arch.nl \
    peer0.org3.arch.nl \
    peer1.org3.arch.nl \
    couchdb0 \
    couchdb1 \
    couchdb2 \
    couchdb3 \
    couchdb4 \
    couchdb5 \
    couchdb6 \
    ca0 \
    ca1 \
    ca2 \
    cli

echo "List of processes"
# listing processes
docker ps --format "ID={{.ID}}\t{{.Names}}\t{{.Status}}"

# waiting for containers to initialise. if they are taking too long to start you can increase the sleeping time
echo waiting
sleep ${FABRIC_START_TIMEOUT}

# creating the channel
echo creating channel
docker exec cli peer channel create -o orderer.arch.nl:7050 \
		-c $CHANNEL_NAME -f ./channel-artifacts/channel.tx

if [ "$?" -ne 0 ]; then
  echo "Failed to create channel"
  exit 1
fi

# joining peers
echo joining peer0.org1.arch.nl
docker exec \
	-e "CORE_PEER_LOCALMSPID=Org1MSP" \
	-e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC1" \
	-e "CORE_PEER_ADDRESS=peer0.org1.arch.nl:7051" \
  cli peer channel join -b $CHANNEL_NAME.block

if [ "$?" -ne 0 ]; then
  echo "Failed to join peer"
  exit 1
fi    
    
echo joining peer1.bc.arch.nl
docker exec \
	-e "CORE_PEER_LOCALMSPID=Org1MSP" \
	-e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC1" \
	-e "CORE_PEER_ADDRESS=peer1.org1.arch.nl:8051" \
  cli peer channel join -b $CHANNEL_NAME.block

if [ "$?" -ne 0 ]; then
  echo "Failed to join peer"
  exit 1
fi

echo joining peer0.org2.arch.nl
docker exec \
  -e "CORE_PEER_LOCALMSPID=Org2MSP" \
  -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC2" \
  -e "CORE_PEER_ADDRESS=peer0.org2.arch.nl:9051" \
  cli peer channel join -b $CHANNEL_NAME.block

if [ "$?" -ne 0 ]; then
  echo "Failed to join peer"
  exit 1
fi

echo joining peer1.org2.arch.nl
docker exec \
  -e "CORE_PEER_LOCALMSPID=Org2MSP" \
  -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC2" \
  -e "CORE_PEER_ADDRESS=peer1.org2.arch.nl:10051" \
  cli peer channel join -b $CHANNEL_NAME.block

if [ "$?" -ne 0 ]; then
  echo "Failed to join peer"
  exit 1
fi

echo joining peer0.org3.arch.nl
docker exec \
  -e "CORE_PEER_LOCALMSPID=Org3MSP" \
  -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC3" \
  -e "CORE_PEER_ADDRESS=peer0.org3.arch.nl:11051" \
  cli peer channel join -b $CHANNEL_NAME.block

if [ "$?" -ne 0 ]; then
  echo "Failed to join peer"
  exit 1
fi

echo joining peer1.org3.arch.nl
docker exec \
  -e "CORE_PEER_LOCALMSPID=Org3MSP" \
  -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC3" \
  -e "CORE_PEER_ADDRESS=peer1.org3.arch.nl:12051" \
  cli peer channel join -b $CHANNEL_NAME.block

if [ "$?" -ne 0 ]; then
  echo "Failed to join peer"
  exit 1
fi

#updating anchor peers
echo updating anchor peer for bc
docker exec \
	-e "CORE_PEER_LOCALMSPID=Org1MSP" \
	-e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
	-e "CORE_PEER_ADDRESS=peer0.bc.arch.nl:7051" \
  cli peer channel update -o orderer.arch.nl:7050 \
  -c $CHANNEL_NAME \
  -f ./channel-artifacts/Org1MSPanchors.tx

if [ "$?" -ne 0 ]; then
  echo "Failed to update anchor peer"
  exit 1
fi

echo "Done"