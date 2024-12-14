require("@nomicfoundation/hardhat-toolbox");
const {vars}= require("hardhat/config");
require("dotenv").config();

const alchemyUrl = process.env.ALCHEMY_URL;
const privateKey = process.env.PRIVATE_KEY;
const ethScan = process.env.ETHERSCAN_API_KEY;
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: alchemyUrl,
      accounts: [privateKey],
    },
    hardhat:{
      chainId: 1337,
      }
  },
  etherscan: {
    apiKey: {
      sepolia: ethScan,
    },
  },
  // sourcify:{
  //   enable: true,
  // }
};
