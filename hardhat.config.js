require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: '.env'});
const PrivateKey = process.env.PRIVATEKEY;
const InfuraId = process.env.INFURAID;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    ropsten: {
      url: InfuraId,
      accounts: [PrivateKey]
    }
  }
};
