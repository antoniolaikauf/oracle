const ethers = require("ethers");
const { provider, contract } = require("./deployCTC");
const { PRIVATE_KEY } = process.env;

function instance() {
  const contractAddress = "0x0AFA4Ec3388027a08C3454CCc2658CD4f5AACff0";
  const contract_instance = new ethers.Contract(contractAddress, contract.interface, provider);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const signed = contract_instance.connect(wallet);
  return signed;
}

exports.i_contract = { instance };
