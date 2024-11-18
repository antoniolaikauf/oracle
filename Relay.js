/*

When an enclave
 is created, the CPU produces a hash of its initial state known
 as a measurement. The software in the enclave may, at a
 later time, request a report which includes a measurement
 and supplementary data provided by the process, such as a
 public key. The report is digitally signed using a hardware
protected key to produce a proof that the measured software
 is running in an SGX-protected enclave


il relay  
It boots the Enclave with progencl.Initialize() and calls
 progencl.Resume(idparams) on incoming requests.

 The Enclave progencl. When initialized through Initial
ize(), PROGencl ingests the current wall-clock time; by storing
 this time and setting a clock reference point, it calibrates its
 absolute clock. It generates an ECDSA keypair (pkTC skTC)
 (parameterized as in Ethereum), where pkTC is bound to the
 progencl instance through insertion into attestations.
 Upon a call to Resume(idparams), progencl contacts the
 data source speci ed by params via HTTPS and checks that
 the corresponding certi cate cert is valid
277

enclave
https://www.intel.com/content/www/us/en/developer/articles/code-sample/intel-software-guard-extensions-developing-a-sample-enclave-application.html 


Event Monitoring: The relay constantly listens to events emitted by smart contracts on the blockchain.
Data Fetching: It retrieves necessary data (e.g., API responses or sensor inputs) based on requests received from the blockchain.
Secure Processing: The fetched data is passed to the TEE, which processes it and generates authenticated results (e.g., signed datagrams).
Blockchain Submission: The relay uses the TEE's output to generate a blockchain transaction, delivering the signed data back to the smart contract.

*/

const ethers = require("ethers");
const { deploy, provider, contract } = require("./deployCTC");

async function main() {
  try {
    const contractAddress = await deploy();

    // bisogna creare una nuova instanza (ho perso 3 ore perchè la importavo)
    const contractInstance = new ethers.Contract(contractAddress, contract.interface, provider);

    // ascoto evento
    // gli eventi si trovano nelle abi
    contractInstance.on("Request_Cu", (id, params_Cu, event) => {
      console.log("Nuovo evento request_Cu ricevuto:", {
        id: id.toString(),
        params_Cu,
        transactionHash: event.transactionHash,
        blockNumber: event.blockNumber,
      });
    });

    console.log("In ascolto degli eventi...");
  } catch (error) {
    console.error("Errore dettagliato:", error);
    process.exit(1);
  }
}

main();