import contract from 'truffle-contract';
import web3 from './web3';
import { handleIssueWithWeb3 } from './web3';
import SpaceLandJson from './contracts/SpaceLand.json'

const SpaceLand = contract(SpaceLandJson);
SpaceLand.setProvider(web3.currentProvider);
handleIssueWithWeb3(SpaceLand.currentProvider);

export default SpaceLand.at('0x535B9b60478e3ac7bCb8e17a8f8E6C4A35956233');