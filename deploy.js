const { ethers } = require("ethers");
const fs = require("fs");
const { API_URL, PRIVATE_KEY } = process.env;
// funzioni del contratto
const abi = JSON.parse(fs.readFileSync(__dirname + "/" + "ContractAbi.json").toString());
// byte_code per macchina EVM 
const byte_code = fs.readFileSync(__dirname + "/" + "ContractBytecode.bin").toString();
console.log(abi);
console.log(byte_code);

const provider = new ethers.JsonRpcProvider(API_URL);
// wallet che deploia il contratto
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.ContractFactory(abi, byte_code, wallet);

async function deploy(c) {
  const contract_deploy = await c.deploy();
  console.log(contract_deploy);
  await contract_deploy.waitForDeployment();
  const address = await contract_deploy.getAddress();

  // per vedere la transazione https://sepolia.etherscan.io/
  console.log(address);
}

deploy(contract);
