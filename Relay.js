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
const crypto = require("crypto");
const { i_contract } = require("./instanceContratto.js");
const signed = i_contract.instance();

function Handle(id, params) {
  const time2 = new Date(params);
  console.log(time2);

  const check_time = setInterval(() => {
    const time1 = new Date();
    if (time2 < time1) {
      clearInterval(check_time);
      // invio dati a resume che si trova nel programma dell'enclave
      // ricevi i dati dall'enclave e li mandi al CTC deliver cosi che la transazione si salvi sulla blockchain
      // devo inviare i dati come WTC al TCT
      // the Toff creates WTC with a fresh public key pk whose secret is known only to Toff.
    }
  }, 6000);
}
// Handle("dd", "ddd");

async function main(PK) {
  try {
    // const contractAddress = "0x0AFA4Ec3388027a08C3454CCc2658CD4f5AACff0";
    const contractAddress = await deploy(PK);
    // console.log(contractAddress);
    console.log(contractAddress);

    // bisogna creare una nuova instanza (ho perso 3 ore perchè la importavo)
    const contractInstance = new ethers.Contract(contractAddress, contract.interface, provider);
    // ascolto evento
    // gli eventi si trovano nelle abi
    contractInstance.on("Request_Cu", (id, params_Cu, event) => {
      Handle(id, params_Cu[2]);
      // console.log(id, "sono id");
      // console.log(params_Cu, "parametri ");
      // console.log(event, "evento generale ");
    });

    console.log("In ascolto degli eventi...");
  } catch (error) {
    console.error("Errore dettagliato:", error);
  }
}

const keypair = crypto.generateKeyPair(
  "rsa",
  {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  },
  (err, publicKey, privateKey) => {
    if (err) console.error(err);
    const public_pemHeader = "-----BEGIN PUBLIC KEY-----";
    const public_pemFooter = "-----END PUBLIC KEY-----";
    const private_pemFooter = "-----END PRIVATE KEY-----";
    const private_pemHeader = "-----BEGIN PRIVATE KEY-----";

    const publicKey_byte64 = publicKey.replace(public_pemFooter, "").replace(public_pemHeader, "").replace(/\n/g, "").trim();
    // const privateKey_byte64 = privateKey.replace(private_pemHeader, "").replace(private_pemFooter, "").replace("\n", "");
    // main(publicKey_byte64);
    console.log(publicKey_byte64.toString(2));
    // console.log(privateKey_byte64);
  }
);

/*
To implement this pseudocode:

Use a cryptographic library that supports secure key generation and signing (e.g., OpenSSL, Intel SGX SDK).
Ensure the private key remains within the enclave's memory space, protected from external access.
Use the public key (pk) to register the enclave on the blockchain or with external validators.

Intel® Software Guard Extensions (Intel® SGX) No il mio processore non supporta SGX 
quindi le due funzioni che prendono dati le crypto, inoltre buona pratica bisogna
criptare anche i parametri che passano dal relay alla recive cosi che non si mostrino neanche i parametri



Part II : Message Security
CHAPTER 3: Block Ciphers
CHAPTER 4: Block Cipher Modes
CHAPTER 6: Message Authentication Codes (MACs)
CHAPTER 7: The Secure Channel
CHAPTER 8: Implementation Issues (I)

Part III : Key Negotiation
CHAPTER 9: Generating Randomness
CHAPTER 11: Diffie-Hellman
CHAPTER 12: RSA

Part IV : Key Management
CHAPTER 21: Storing Secrets

Zero-Knowledge Proofs (ZKP)
*/
