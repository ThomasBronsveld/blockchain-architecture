export SYS_CHANNEL="hva-sys-channel"
#export CHANNEL_NAME="hva-channel"
export CHANNEL_NAME="mychannel"
export CA_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/bc.hva.nl/ca 2> /dev/null&& ls *_sk)
export CLI_DELAY=2
export LANGUAGE=node
export CLI_TIMEOUT=10
export VERBOSE=false
export FABRIC_START_TIMEOUT=10
export BLOCK_CREATION_TIMEOUT_BEFORE_DEPLOYMENT=3
export BLOCK_CREATION_TIMEOUT_AFTER_DEPLOYMENT=1200

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

#certificate files
export MSP_CONFIG_BC=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/bc.hva.nl/users/Admin@bc.hva.nl/msp
