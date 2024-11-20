const ethers = require("ethers");
const { provider, contract } = require("./deployCTC");
const { PRIVATE_KEY } = process.env;
// import { contract_Instance } from  "./Relay.js"
// const { contract_Instance } = require("./Relay.js");
// console.log(contract_Instance);
const contractAddress = "0x11c9C829ae56f5CE218Af440DEF129bAa9517576";
const contract_instance = new ethers.Contract(contractAddress, contract.interface, provider);

// let privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const signed = contract_instance.connect(wallet);

const callback = "0x152656A93b4F90c45E22eBd3DAD475F50009Abf1";
const paramsUrl = "ciao";
const paramsUrlspecifici = "ciao";
const time = new Date(); // ora standart europa formato Wed Nov 20 2024 13:04:52
async function test(C, Pu, Pus, T) {
  // PS  il T l'ho cambiato in string nel contratto ma lo devo ancora deploiare correttamente
  T = T.toString().slice(0, 25);
  const tx = await signed.Request(C, Pu, Pus, T, 100000);

  console.log(tx.hash);
  await tx.waiit(); // aspettare che la transazione sia minata
  //   console.log(C);
  //   console.log(T);
  //   console.log(Pus);
  //   console.log(Pu);
}

test(callback, paramsUrl, paramsUrlspecifici, time);
