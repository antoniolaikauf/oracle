const axios = require("axios");
const { ethers } = require("ethers");

const wheder = async () => {
  try {
    const dati = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=milano&appid=0be4b5ede4e652b4492170e06575be32");
    // console.log(dati.data);
    let dati_wheder = dati.data;
    return dati_wheder;
  } catch (error) {
    console.error(error);
  }
};

async function update() {
  const data = await wheder();
  // invio dati allo smart contract
  console.log(data);
}

setInterval(update, 3000);

// const myContract = new web3.eth.Contract(abi, deployedAddress); interazione con contratto

//https://docs.web3js.org/guides/smart_contracts/smart_contracts_guide
