const Web3 = require('web3')
//const rpcURL = 'https://ropsten.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d' // Your RCkP URL goes here
const rpcURL = 'https://rinkeby.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d' // Your RCkP URL goes here
//const rpcURL = 'http://localhost:8545)'
const web3 = new Web3(rpcURL)
//const addressMy = '0xcB15f0674970E712247Fb50b7E27B8B9F6400c88' // Your account address goes here
const addressMy = '0xcB15f0674970E712247Fb50b7E27B8B9F6400c88'
//const addressMy = '0x92544353d4d07f71f8b4d1b45c3795b9995c83cd'
web3.eth.getBalance(addressMy, (err, wei) => { 
    balance = web3.utils.fromWei(wei, 'ether')
    console.log("balance : " , balance) })

