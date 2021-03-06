#!/bin/bash
#
# Author: MFK and Thomas
# Based on the hyperledger fabric documentation and fabric-samples
#
# This script generates crypto materials and config files for the network
#

cat banner

# setting common environment variables
. ./../common/setenv.sh

# removing previous configurations
rm -Rf crypto-config
rm -Rf channel-artifacts
rm -Rf ../app/ccp

# generating crypto materials
cryptogen generate --config=./crypto-config.yaml

if [ $? -ne 0 ]; then
  echo "Failed to generate certificates"
  exit 1
fi

echo "Generating CCP files for bc"
./ccp-generate.sh

mkdir channel-artifacts

echo Generating Orderer Genesis block

configtxgen -profile OneOrgOrdererGenesis -channelID $SYS_CHANNEL -outputBlock ./channel-artifacts/genesis.block

if [ $? -ne 0 ]; then
   echo "Failed to generate orderer genesis block"
   exit 1
fi

echo Generating channel configuration transaction

configtxgen -profile OneOrgChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME

if [ $? -ne 0 ]; then
   echo "Failed to generate channel configuration transaction..."
   exit 1
fi

echo Generating anchor peer update for bcMSP

configtxgen -profile OneOrgChannel -outputAnchorPeersUpdate ./channel-artifacts/bcMSPanchors.tx -channelID $CHANNEL_NAME -asOrg bcMSP

if [ $? -ne 0 ]; then
   echo "Failed to generate anchor peer update for bcMSP..."
   exit 1
fi

echo "Done"