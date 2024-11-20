const ethers = require("ethers");
const { provider, contract } = require("./deployCTC");
// import { contract_Instance } from  "./Relay.js"
// const { contract_Instance } = require("./Relay.js");
// console.log(contract_Instance);
const contractAddress = "0x11c9C829ae56f5CE218Af440DEF129bAa9517576";
const contract_instance = new ethers.Contract(contractAddress, contract.interface, provider);

let privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";
const wallet = new ethers.Wallet(privateKey, provider);
const signed = contract.connect(wallet);

const callback = "0x152656A93b4F90c45E22eBd3DAD475F50009Abf1";
const paramsUrl = "ciao";
const paramsUrlspecifici = "ciao";
const time = new Date();
async function test(C, Pu, Pus, T) {
  console.log(C);
  console.log(T);
  console.log(Pus);
  console.log(Pu);

  //   const tx = await signed.Request();
}

test(callback, paramsUrl, paramsUrlspecifici, time);
