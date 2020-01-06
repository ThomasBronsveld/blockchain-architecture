#!/bin/bash

function json_ccp {
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
		-e "s/\${P2PORT}/$4/" \
		-e "s/\${P3PORT}/$5/" \
		-e "s/\${P4PORT}/$6/" \
        -e "s/\${CAPORT}/$7/" \
        ccp-template.json 
}

mkdir ../client/ccp

ORG=bc
P0PORT=7051
P1PORT=8051
P2PORT=9051
P3PORT=10051
P4PORT=11051
CAPORT=7054

echo "$(json_ccp $ORG $P0PORT $P1PORT $P2PORT $P3PORT $P4PORT $CAPORT)" > ../client/ccp/connection-bc.json