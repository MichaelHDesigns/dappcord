require ("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      blockConfirmations: 1,
      allowUnlimitedContractSize: true,
      chainId: 2330 // Replace with the appropriate chain ID
    },
    hardhat: {
      chainId: 2330,
      blockConfirmations: 1,
      allowUnlimitedContractSize: true,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.4", settings: {
      optimizer: {
        runs: 200,
        enabled: true
      }
    } }, { version: "0.8.17"}],
  },

  mocha: {
    timeout: 300000, // 300 seconds max
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  gasReporter: {
    // enabled: process.env.REPORT_GAS !== undefined,
    enabled: false,
    currency: "INR",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "ETH",
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
}
