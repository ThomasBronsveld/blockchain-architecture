#!/bin/bash

TIMEOUT=$1

echo "getting dconfiguration block of channel"
peer channel fetch config config_block.pb -o orderer.hva.nl:7050 -c mychannel

if [ "$?" -ne 0 ]; then
  echo "Failed getting configuration block of channel"
  exit 1
fi

echo "parsing the binary configuration block to json format"
configtxlator proto_decode --input config_block.pb --type common.Block | jq .data.data[0].payload.data.config > config.json

if [ "$?" -ne 0 ]; then
  echo "Failed parsing the binary configuration block to json format"
  exit 1
fi

export TIMEOUTPATH=".channel_group.groups.Orderer.values.BatchTimeout.value.timeout"
echo "changing the timeout value"
jq "$TIMEOUTPATH = \"${TIMEOUT}s\"" config.json > config.new.json

if [ "$?" -ne 0 ]; then
  echo "Failed changing the timeout value"
  exit 1
fi

echo "transforming the new configuration to the binary format"
configtxlator proto_encode --input config.new.json --type common.Config --output new.config.pb

if [ "$?" -ne 0 ]; then
  echo "Failed transforming the new configuration to the binary format"
  exit 1
fi

echo "transforming the original configuration to the binary format"
configtxlator proto_encode --input config.json --type common.Config --output config.pb

if [ "$?" -ne 0 ]; then
  echo "Failed transforming the new configuration to the binary format"
  exit 1
fi

echo "generating the diff between the new and old configuration"
configtxlator compute_update --channel_id mychannel --original config.pb --updated new.config.pb --output update.pb

if [ "$?" -ne 0 ]; then
  echo "Failed generating the diff between the new and old configuration"
  exit 1
fi

echo "decoding update configuration"
configtxlator proto_decode --input update.pb  --type common.ConfigUpdate | jq . > update.json

if [ "$?" -ne 0 ]; then
  echo "Failed decoding update configuration"
  exit 1
fi

echo "generating payload of update configuration"
echo '{"payload":{"header":{"channel_header":{"channel_id":"mychannel", "type":2}},"data":{"config_update":'$(cat update.json)'}}}' | jq . > update_in_envelope.new.json

if [ "$?" -ne 0 ]; then
  echo "Failed generating payload of update configuration"
  exit 1
fi

echo "turning the payload into a binary envelope"
configtxlator proto_encode --input update_in_envelope.new.json --type common.Envelope --output update_in_envelope.pb

if [ "$?" -ne 0 ]; then
  echo "Failed turning the payload into a binary envelope"
  exit 1
fi

echo "signing the configuration change"
export CORE_PEER_ADDRESS=orderer.hva.nl:7050
export CORE_PEER_LOCALMSPID="OrdererMSP"
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/hva.nl/users/Admin@hva.nl/msp
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/hva.nl/orderers/orderer.hva.nl/tls/ca.crt
peer channel signconfigtx -f update_in_envelope.pb

if [ "$?" -ne 0 ]; then
  echo "Failed signing the configuration change"
  exit 1
fi

echo "updating channel configuration"
peer channel update -f update_in_envelope.pb -c mychannel -o orderer.hva.nl:7050 

if [ "$?" -ne 0 ]; then
  echo "Failed updating channel configuration"
  exit 1
fi

echo "Done"
