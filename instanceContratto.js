const ethers = require("ethers");
const { provider, contract } = require("./deployCTC");
const { PRIVATE_KEY } = process.env;

function instance() {
  const contractAddress = "0x9e50e2938C85935E29cc83d1FBf4c4801D9c7bC7";
  const contract_instance = new ethers.Contract(contractAddress, contract.interface, provider);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const signed = contract_instance.connect(wallet);
  return signed;
}

exports.i_contract = { instance };
