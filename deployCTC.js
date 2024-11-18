const ethers = require("ethers");
const fs = require("fs");
const solc = require("solc");

const { API_URL, PRIVATE_KEY } = process.env;

const file_contract = fs.readFileSync(__dirname + "/ContractCTC.sol", "utf-8");

var input = {
  language: "Solidity",
  sources: {
    "/ContractCTC.sol": {
      content: file_contract,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compile_code = JSON.parse(solc.compile(JSON.stringify(input)));

// bytecode contratto
const file_bytecode = __dirname + "/" + "ContractCTCBytecode.bin";
const bytecode = compile_code.contracts["/ContractCTC.sol"]["Tct"].evm.bytecode.object;
fs.writeFileSync(file_bytecode, bytecode);

// abicode contratto
const file_abi = __dirname + "/" + "ContractTCTabi.json";
const abi = compile_code.contracts["/ContractCTC.sol"]["Tct"].abi;
fs.writeFileSync(file_abi, JSON.stringify(abi, null, "\t"));

const provider = new ethers.JsonRpcProvider(API_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const abi_read = JSON.parse(fs.readFileSync(file_abi).toString());
const bytecode_read = fs.readFileSync(file_bytecode).toString();
const contract = new ethers.ContractFactory(abi_read, bytecode_read, wallet);

async function deploy(c) {
  try {
    const contract_deploy = await c.deploy();
    await contract_deploy.waitForDeployment();
    const transection = await contract_deploy.getAddress();
    console.log(transection);
  } catch (error) {
    console.error(error);
  }
}

deploy(contract);

// 0x4c78927Fcec5D4b488A2b887135cBbbad381c9F1 contratto
