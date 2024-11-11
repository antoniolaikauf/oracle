const { ethers } = require("ethers");
const fs = require("fs");
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

// async function prova(params) {
//   const p = await provider.getBlockNumber();
//   console.log(p);
// }

// prova();
// // wallet che deploia il contratto
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
console.log(wallet);

const contract = new ethers.ContractFactory(abi, byte_code, wallet);

async function deploy(c) {
  const contract_deploy = await c.deploy();
  console.log(contract_deploy);
  await contract_deploy.waitForDeployment();
  const address = await contract_deploy.getAddress();
  // const send = contract_deploy.upgrade_wheder("ciaoaoao");
  // send.then((transazione) => {
  //   console.log(transazione, "transazione");
  // });
  // setTimeout(() => {
  //   const get = contract_deploy.get_wheder();
  //   get.then((value) => {
  //     console.log(value, "risposta");
  //   });
  // }, 1000);

  // per vedere la transazione https://sepolia.etherscan.io/
  console.log(address);
}

deploy(contract);

// 0x231023aEfAB5d67D46feEe6695D71242f7d8594A // address contratto

// https://opt-mainnet.g.alchemy.com/v2/_A07DZeEX7CPpIrS6nJdRZ1O-HDSPUIF
// https://eth-sepolia.g.alchemy.com/v2/_A07DZeEX7CPpIrS6nJdRZ1O-HDSPUIF
