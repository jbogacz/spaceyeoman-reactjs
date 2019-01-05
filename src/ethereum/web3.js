import Web3 from 'web3';

// Workaround for web3@1.0.0 issue. See https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
export function handleIssueWithWeb3(provider) {
  if (typeof provider.sendAsync !== "function") {
    provider.sendAsync = function() {
      return provider.send.apply(provider, arguments);
    };
  }
}

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
  console.log('SPACE_YEOMAN::', 'I`m using metamask provider.');
} else {
  // We are one the browser *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/e1c8d8c784594ab0b9bcd4f9d890e89c'
  );
  web3 = new Web3(provider);
}

export default web3;