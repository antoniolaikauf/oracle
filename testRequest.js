// -----------------------------------------------------------------------------
// test per verificare il funzionamento
// -----------------------------------------------------------------------------

// const ethers = require("ethers");
const { i_contract } = require("./instanceContratto.js");
const signed = i_contract.instance();
console.log(signed);

const callback = "0xa42b1378D1A84b153eB3e3838aE62870A67a40EA";
const paramsUrl = "ciao";
const paramsUrlspecifici = "ciao";
const time = new Date(); // ora standart europa formato Wed Nov 20 2024 13:04:52

async function test(C, Pu, Pus, T) {
  // PS  il T l'ho cambiato in string nel contratto ma lo devo ancora deploiare correttamente
  T = T.toString().slice(0, 21);
  console.log(T);

  const tx = await signed.Request(C, Pu, Pus, T, 100000);
  console.log(tx);
  await tx.wait(); // aspettare che la transazione sia minata
}

test(callback, paramsUrl, paramsUrlspecifici, time);
