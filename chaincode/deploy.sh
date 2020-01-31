#!/bin/bash
# Automate the deployment of this chaincode
# To be improved: Not working for chaincode upgrade yet. 
#
# Author: MFK
# disclaimer: fabric-examples were used as a basis for building this code

. ./../common/setenv.sh

if [ -z "$1" ]; then
    VERSION=1.0
else
	VERSION=$1
fi

# PEERS=$( echo "peer0:7051;peer1:8051;peer2:9051;peer3:10051;peer4:11051" | tr ";" "\n")
PEERS=$( echo "peer0:7051;peer1:8051" | tr ";" "\n")

# Installing chaincode
for PEER in $PEERS
do
   
   HOST=$(echo $PEER | cut -d ":" -f1)
   PORT=$(echo $PEER | cut -d ":" -f2)

   echo installing chaincode version $VERSION in $HOST.bc.hva.nl:$PORT

   docker exec \
	   -e "CORE_PEER_LOCALMSPID=bcMSP" -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
	   -e "CORE_PEER_ADDRESS=$HOST.bc.hva.nl:$PORT" \
       cli peer chaincode install -n mycc -v ${VERSION} -l "node" -p /opt/gopath/src/github.com/chaincode

   if [ "$?" -ne 0 ]; then
     echo "Failed to install chaincode"
     exit 1
   fi
done

# sleep 5

# instantiation - only one arbitrary peer is enough to instantiate

HOST=peer0
PORT=7051

EXISTS=$(docker exec \
    -e "CORE_PEER_LOCALMSPID=bcMSP" -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
    -e "CORE_PEER_ADDRESS=$HOST.bc.hva.nl:$PORT" \
cli peer chaincode list --instantiated -C $CHANNEL_NAME | grep mycc)


if test -z "$EXISTS"
then

	echo instantiating chaincode version $VERSION from $HOST.bc.hva.nl:$PORT

	docker exec \
		-e "CORE_PEER_LOCALMSPID=bcMSP" -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
		-e "CORE_PEER_ADDRESS=$HOST.bc.hva.nl:$PORT" \
		cli peer chaincode instantiate -o orderer.hva.nl:7050 \
			-C $CHANNEL_NAME -n mycc -l node -v ${VERSION} -c '{"Args":[]}' -P "AND ('bcMSP.peer','bcMSP.peer')"

	if [ "$?" -ne 0 ]; then
	  echo "Failed to instantiate chaincode"
	  exit 1
	fi

else
		
	echo upgrading chaincode version $VERSION in $HOST.bc.hva.nl:$PORT

	docker exec \
    	cli peer chaincode upgrade -o orderer.hva.nl:7050 \
    		-C $CHANNEL_NAME -n mycc -l node -v ${VERSION} -c '{"Args":[]}' -P "AND ('bcMSP.peer','bcMSP.peer')"

	docker exec \
		-e "CORE_PEER_LOCALMSPID=bcMSP" -e "CORE_PEER_MSPCONFIGPATH=$MSP_CONFIG_BC" \
		-e "CORE_PEER_ADDRESS=$HOST.bc.hva.nl:$PORT" \
    	cli peer chaincode upgrade -o orderer.hva.nl:7050 \
    		-C $CHANNEL_NAME -n mycc -l node -v ${VERSION} -c '{"Args":[]}' -P "AND ('bcMSP.peer','bcMSP.peer')"

	if [ "$?" -ne 0 ]; then
	  echo "Failed to instantiate chaincode"
	  exit 1
	fi		


fi    