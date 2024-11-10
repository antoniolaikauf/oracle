const solc = require("solc");
const fs = require("fs");

const contractName = "Wheder";
const file_name = `${contractName}.sol`;

const file_path = fs.readFileSync(__dirname + "/" + file_name, "utf-8");

var input = {
  language: "Solidity",
  sources: {
    [file_name]: {
      content: file_path,
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

const bytecode = compile_code.contracts[file_name][contractName].evm.bytecode.object;

fs.writeFileSync(__dirname + "/" + "ContractBytecode.bin", bytecode);

// dentro all'abi ci sono le funzioni del contratto
const abi = compile_code.contracts[file_name][contractName].abi;
fs.writeFileSync(__dirname + "/" + 'ContractAbi.json', JSON.stringify(abi, null, "\t"));
