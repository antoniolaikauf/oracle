const ethers = require("ethers");
const { provider, contract } = require("./deployCTC");
// const { provider, contract } = require("./deploy");
const { PRIVATE_KEY } = process.env;
// import { contract_Instance } from  "./Relay.js"
// const { contract_Instance } = require("./Relay.js");
// console.log(contract_Instance);
const contractAddress = "0x9dAf7c849c20Be671315E77CB689811bD5EDefe6";
// const contractAddress1 = "0x96b8ea5D70581cB6C0F43F08cF5f86E38a87A36A";
const contract_instance = new ethers.Contract(contractAddress, contract.interface, provider);

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const signed = contract_instance.connect(wallet);

const callback = "0xa42b1378D1A84b153eB3e3838aE62870A67a40EA";
const paramsUrl = "ciao";
const paramsUrlspecifici = "ciao";
const time = new Date(); // ora standart europa formato Wed Nov 20 2024 13:04:52
async function test(C, Pu, Pus, T) {
  // PS  il T l'ho cambiato in string nel contratto ma lo devo ancora deploiare correttamente
  T = T.toString().slice(0, 25);
  //   const f = ethers.parseEther("0.0000000000001", "ether");
  //   console.log(f);
  //   const prova = await signed.upgrade_wheder("ciccici");
  //   console.log(prova);
  //   const prova1 = await contract_instance.get_wheder();
  //   console.log(prova1);

  const tx = await signed.Request(C, Pu, Pus, T, 0);

  console.log(tx.hash);
  await tx.wait(); // aspettare che la transazione sia minata
  //   console.log(C);
  //   console.log(T);
  //   console.log(Pus);
  //   console.log(Pu);
}

test(callback, paramsUrl, paramsUrlspecifici, time);
