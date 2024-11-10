const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
const abi = require("./ContractAbi.json");

const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/_A07DZeEX7CPpIrS6nJdRZ1O-HDSPUIF");

const byte_code = fs.readFileSync(__dirname + "/" + "ContractBytecode.bin", "utf-8");
console.log(web3);

const my_contract = new web3.eth.Contract(abi);
my_contract.handleRevert = true;

async function deploy() {
  const account = await web3.eth.getAccounts();
  console.log(account[0]);
}

// async function deploy() {
//   const providersAccounts = await web3.eth.getAccounts();
//   const defaultAccount = providersAccounts[0];
//   console.log("Deployer account:", defaultAccount);

//   const contractDeployer = myContract.deploy({
//     data: "0x" + bytecode,
//     arguments: [1],
//   });

//   const gas = await contractDeployer.estimateGas({
//     from: defaultAccount,
//   });
//   console.log("Estimated gas:", gas);

//   try {
//     const tx = await contractDeployer.send({
//       from: defaultAccount,
//       gas,
//       gasPrice: 10000000000,
//     });
//     console.log("Contract deployed at address: " + tx.options.address);

//     const deployedAddressPath = path.join(__dirname, "MyContractAddress.txt");
//     fs.writeFileSync(deployedAddressPath, tx.options.address);
//   } catch (error) {
//     console.error(error);
//   }
// }

deploy();
