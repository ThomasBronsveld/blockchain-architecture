#!/bin/bash
#
# Script used to stop the blockchain network
#
# Author: MFK and Thomas
# disclaimer: fabric-examples were used as a basis for building this code

cat banner

# setting common environment variables
. ./../common/setenv.sh

docker-compose -f docker-compose-cli.yaml -f docker-compose-ca.yaml -f docker-compose-couch.yaml down --volumes --remove-orphans

CONTAINER_IDS=$(docker ps -a | awk '($2 ~ /dev-peer.*.mycc.*/) {print $1}')
if [ -z "$CONTAINER_IDS" -o "$CONTAINER_IDS" == " " ]; then
   echo "---- No containers available for deletion ----"
else
   docker rm -f $CONTAINER_IDS
fi

DOCKER_IMAGE_IDS=$(docker images | awk '($1 ~ /dev-peer.*.mycc.*/) {print $3}')
if [ -z "$DOCKER_IMAGE_IDS" -o "$DOCKER_IMAGE_IDS" == " " ]; then
   echo "---- No images available for deletion ----"
else
   docker rmi -f $DOCKER_IMAGE_IDS
fi