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

const file_bytecode = __dirname + "/" + "ContractCTCBytecode.bin";
const bytecode = compile_code.contracts["/ContractCTC.sol"]["Tct"].evm.bytecode.object;
fs.writeFileSync(file_bytecode, bytecode);

const file_abi = __dirname + "/" + "ContractTCTabi.json";
const abi = compile_code.contracts["/ContractCTC.sol"]["Tct"].abi;
fs.writeFileSync(file_abi, JSON.stringify(abi, null, "\t"));

const abi_read = fs.readFileSync();
const provider = new ethers.JsonRpcApiProvider(API_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.ContractFactory();
