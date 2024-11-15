const { ethers } = require("ethers");
const fs = require("fs");
const axios = require("axios");

const { API_URL, PRIVATE_KEY } = process.env;
// funzioni del contratto
const abi = JSON.parse(fs.readFileSync(__dirname + "/" + "ContractAbi.json").toString());
// byte_code per macchina EVM
const byte_code = fs.readFileSync(__dirname + "/" + "ContractBytecode.bin").toString();

// console.log(API_URL);
console.log(PRIVATE_KEY);

const provider = new ethers.JsonRpcProvider(API_URL);
// // wallet che deploia il contratto
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
console.log(wallet);

const contract = new ethers.ContractFactory(abi, byte_code, wallet);

async function upgrade_contract(contract_deployed) {
  try {
    const dati = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=milano&appid=0be4b5ede4e652b4492170e06575be32");
    let dati_wheder = dati.data;
    const send = contract_deployed.upgrade_wheder(dati_wheder.weather[0].main);
    send.then((transazione) => {
      console.log(transazione, "transazione");
    });

    console.log(dati_wheder.weather[0].main);
  } catch (error) {
    console.error(error);
  }
}

async function deploy(c) {
  const contract_deploy = await c.deploy();
  await contract_deploy.waitForDeployment();
  const address = await contract_deploy.getAddress();
  // per vedere la transazione https://sepolia.etherscan.io/
  console.log(address);
  // esecuzione prima a 0 e dopo ogni ora
  upgrade_contract(contract_deploy);
  setInterval(() => {
    upgrade_contract(contract_deploy);
  }, 3600 * 1000);
}

deploy(contract);

// l'address del contratto cambia ogni volta per colpa del nonce
// 0x231023aEfAB5d67D46feEe6695D71242f7d8594A // address contratto

// 0x20e40f1963e5eE9409c93BBED1b4ba09bA3Ee257

// 0x96b8ea5D70581cB6C0F43F08cF5f86E38a87A36A

// Supporting cross-blockchain interoperability: Chainlink can connect blockchain platforms to support the exchange of messages, tokens, and specific actions.

/*
Data signing – Chainlink oracles sign the data they input on-chain with a unique cryptographic signature, allowing users to prove its origin as being from a specific oracle node.


Graphene-SGX o Occlum per teconologia TC SGX
*/
