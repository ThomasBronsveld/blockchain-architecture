export SYS_CHANNEL="arch-sys-channel"
#export CHANNEL_NAME="arch-channel"
export CHANNEL_NAME="mychannel"
export CA_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/org1.arch.nl/ca 2> /dev/null&& ls *_sk)
export CLI_DELAY=2
export LANGUAGE=node
export CLI_TIMEOUT=10
export VERBOSE=false
export FABRIC_START_TIMEOUT=30
export BLOCK_CREATION_TIMEOUT_BEFORE_DEPLOYMENT=3
export BLOCK_CREATION_TIMEOUT_AFTER_DEPLOYMENT=1200

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

#certificate files
export MSP_CONFIG_BC1=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.arch.nl/users/Admin@org1.arch.nl/msp
export MSP_CONFIG_BC2=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.arch.nl/users/Admin@org2.arch.nl/msp
export MSP_CONFIG_BC3=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.arch.nl/users/Admin@org3.arch.nl/msp