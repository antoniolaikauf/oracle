const { ethers } = require("ethers");
const fs = require("fs");
const axios = require("axios");

const { API_URL, PRIVATE_KEY } = process.env;
// funzioni del contratto
const abi = JSON.parse(fs.readFileSync(__dirname + "/" + "ContractAbi.json").toString());
// byte_code per macchina EVM
const byte_code = fs.readFileSync(__dirname + "/" + "ContractBytecode.bin").toString();
// console.log(abi);
// console.log(byte_code);

console.log(API_URL);
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
    const send = contract_deployed.upgrade_wheder("ciaoaoao");
    send.then((transazione) => {
      console.log(transazione, "transazione");
    });

    // setTimeout(() => {
    //   const get = contract_deployed.get_wheder();
    //   get.then((value) => {
    //     console.log(value, "risposta");
    //   });
    // }, 1000);
    
    console.log(dati_wheder);
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
  count = 0;
  setInterval(() => {
    count++;
    if (count % 3600 === 0) {
      upgrade_contract(contract_deploy);
    }
  }, 1000);
}

deploy(contract);

// 0x231023aEfAB5d67D46feEe6695D71242f7d8594A // address contratto

// https://opt-mainnet.g.alchemy.com/v2/_A07DZeEX7CPpIrS6nJdRZ1O-HDSPUIF
// https://eth-sepolia.g.alchemy.com/v2/_A07DZeEX7CPpIrS6nJdRZ1O-HDSPUIF
