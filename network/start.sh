#!/bin/bash
#
# Author: MFK and Thomas
# Based on the hyperledger fabric documentation and fabric-samples
#
# This script starts a hyperledger fabric network with one orgs, five peers
#

# setting common environment variables
. ./../common/setenv.sh

# clean the keystore
rm -rf ./hfc-key-store

# starting all containers (peers, ca, couchdb)
# docker-compose -f docker-compose-cli.yaml -f docker-compose-ca.yaml -f docker-compose-couch.yaml up -d

docker-compose \
    -f docker-compose-cli.yaml \
    -f docker-compose-ca.yaml \
    -f docker-compose-couch.yaml up -d \
    orderer.hva.nl \
    peer0.bc.hva.nl \
    peer1.bc.hva.nl \
    couchdb0 \
    couchdb1 \
    ca0 \
    cli

echo "List of processes"
# listing processes
docker ps --format "ID={{.ID}}\t{{.Names}}\t{{.Status}}"

# waiting for containers to initialise. if they are taking too long to start you can increase the sleeping time
echo waiting
sleep ${FABRIC_START_TIMEOUT}

# creating the channel
echo creating channel
docker exec cli peer channel create -o orderer.hva.nl:7050 \
		-c $CHANNEL_NAME -f ./channel-artifacts/channel.tx

if [ "$?" -ne 0 ]; then
  echo "Failed to create channel"
  exit 1
fi

# joining peers
echo joining peer0.bc.hva.nl
docker exec \
	-e "CORE_PEER_LOCALMSPID=bcMSP" \
	-e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
	-e "CORE_PEER_ADDRESS=peer0.bc.hva.nl:7051" \
  cli peer channel join -b $CHANNEL_NAME.block

if [ "$?" -ne 0 ]; then
  echo "Failed to join peer"
  exit 1
fi    
    
echo joining peer1.bc.hva.nl
docker exec \
	-e "CORE_PEER_LOCALMSPID=bcMSP" \
	-e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
	-e "CORE_PEER_ADDRESS=peer1.bc.hva.nl:8051" \
  cli peer channel join -b $CHANNEL_NAME.block

if [ "$?" -ne 0 ]; then
  echo "Failed to join peer"
  exit 1
fi

# echo joining peer2.bc.hva.nl
# docker exec \
#   -e "CORE_PEER_LOCALMSPID=bcMSP" \
#   -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
#   -e "CORE_PEER_ADDRESS=peer2.bc.hva.nl:9051" \
#   cli peer channel join -b $CHANNEL_NAME.block

# if [ "$?" -ne 0 ]; then
#   echo "Failed to join peer"
#   exit 1
# fi

# echo joining peer3.bc.hva.nl
# docker exec \
#   -e "CORE_PEER_LOCALMSPID=bcMSP" \
#   -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
#   -e "CORE_PEER_ADDRESS=peer3.bc.hva.nl:10051" \
#   cli peer channel join -b $CHANNEL_NAME.block

# if [ "$?" -ne 0 ]; then
#   echo "Failed to join peer"
#   exit 1
# fi

# echo joining peer4.bc.hva.nl
# docker exec \
#   -e "CORE_PEER_LOCALMSPID=bcMSP" \
#   -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
#   -e "CORE_PEER_ADDRESS=peer4.bc.hva.nl:11051" \
#   cli peer channel join -b $CHANNEL_NAME.block

# if [ "$?" -ne 0 ]; then
#   echo "Failed to join peer"
#   exit 1
# fi

#updating anchor peers
echo updating anchor peer for bc
docker exec \
	-e "CORE_PEER_LOCALMSPID=bcMSP" \
	-e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
	-e "CORE_PEER_ADDRESS=peer0.bc.hva.nl:7051" \
  cli peer channel update -o orderer.hva.nl:7050 \
  -c $CHANNEL_NAME \
  -f ./channel-artifacts/bcMSPanchors.tx

if [ "$?" -ne 0 ]; then
  echo "Failed to update anchor peer"
  exit 1
fi

echo "Done"