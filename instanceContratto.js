const ethers = require("ethers");
const { provider, contract } = require("./deployCTC");
const { PRIVATE_KEY } = process.env;

function instance() {
  const contractAddress = "0xB25f1f0B4653b4e104f7Fbd64Ff183e23CdBa582";
  const contract_instance = new ethers.Contract(contractAddress, contract.interface, provider);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const signed = contract_instance.connect(wallet);
  return signed;
}

exports.i_contract = { instance };
