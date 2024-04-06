import "dotenv/config"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-solhint"
import "hardhat-typechain"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "hardhat-deploy"
import "solidity-coverage"
import "hardhat-gas-reporter"

import { randomBytes } from "crypto"
import { network } from "hardhat"

// if (process.env.COMPILE_ONLY != "1" || true) {
//   require("./tasks/deploy")
//   require("./tasks/inspect")
//   require("./tasks/merkle")
// }

const configureNetwork = (network: string, chainId: number, gasPrice?: number) => ({
  url: `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
  chainId,
  accounts: [process.env[`${network.toUpperCase()}_PVT_KEY`] ?? randomBytes(32).toString("hex")],
  gasPrice: gasPrice ?? undefined,
})

let networks = {
  // hardhat: {
  //   allowUnlimitedContractSize: false,
  //   forking: {
  //     url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  //     enabled: true,
  //   },
  // },
  // mainnet: configureNetwork("mainnet", 1),
  // rinkebyAlchemy: {
  //   url: `https://eth-rinkeby.alchemyapi.io/v2/82gaH21tArzd94dLFsWVHrsryismjKw-`,
  //   chainId: 4,
  //   accounts: [process.env.RINKEBY_PVT_KEY],
  // },
  // kovan: configureNetwork("kovan", 42),
  // rinkeby: configureNetwork("rinkeby", 4),
  // goerli: configureNetwork("goerli", 5),
  // fork: {
  //   url: "http://127.0.0.1:8545/",
  // },
  local: {
    url: "http://127.0.0.1:7545/",
  },
  // bsctest: {
  //   url: "https://data-seed-prebsc-1-s1.binance.org",
  //   accounts: [process.env.PRIVATEKEY]
  // },
  // bsc: {
  //   url: "https://speedy-nodes-nyc.moralis.io/9f1fe98d210bc4fca911bee2/bsc/mainnet",
  //   accounts: [process.env.PRIVATEKEY]
  // }
}

if (process.env.SANDBOX_URL && process.env.SANDBOX_PVT_KEY) {
  // @ts-ignore
  networks.sandbox = {
    url: process.env.SANDBOX_URL,
    accounts: [process.env.SANDBOX_PVT_KEY],
  }
}

export default {
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks,
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 800,
          },
          metadata: {
            bytecodeHash: "none",
          },
        },
      },
      // {
      //   version: "0.8.0",
      //   settings: {
      //     optimizer: {
      //       enabled: true,
      //       runs: 800,
      //     },
      //     metadata: {
      //       bytecodeHash: "none",
      //     },
      //   },
      // },
    ],
  },
}
