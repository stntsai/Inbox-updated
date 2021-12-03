// the below wallet contain no real ether, for testing only
const Mnemonic = 'before mobile boat general hedgehog alter satoshi scrap other athlete salmon unique'
const infura_url = 'https://rinkeby.infura.io/v3/cf0d54c2cc2e4978852c2c5e448bb19f'
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
 
const { abi, evm } = require('./compile');
 
const provider = new HDWalletProvider(
    Mnemonic,
    infura_url
);
 
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });
 
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
 
deploy();