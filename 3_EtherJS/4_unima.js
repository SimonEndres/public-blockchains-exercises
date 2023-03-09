// Ethers JS: First interaction with (not) UniMa blockchain.
////////////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

// Your code here!
require('dotenv').config();
const ethers = require('ethers');

// Exercise 1. Create a JSON RPC Provider for the (not) UniMa Blockchain.
/////////////////////////////////////////////////////////////////////////

// It seems we cannot (yet) call our blockchain the official Uni Mannheim
// blockchain, so we will reference it throughout the exercises as the
// (not) UniMa Blockchain.

// a. Add the RPC endpoints to the .env with names:
// - NOT_UNIMA_URL_1
// - NOT_UNIMA_URL_2

// Hint: you find the RPC endpoints on the slides in ILIAS.

// b. Create the JSON RPC provider object.
// Hint: only accessible within UniMa network.

// Your code here!

const notUniMaProvider = new ethers.JsonRpcProvider(process.env.NOT_UNIMA_URL_1);

// Exercise 2. Let's query the provider.
////////////////////////////////////////

// (not) UniMa Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {

    let net = await notUniMaProvider.getNetwork();
    console.log('NUMA info:');
    console.log('Network name: ' + net.name);
    console.log('Network chain id: ' + Number(net.chainId));
    console.log('Network block number: ' + await notUniMaProvider.getBlockNumber());

};

// networkInfo();


// Exercise 3. Connect a signer to the (not) UniMa blockchain.
//////////////////////////////////////////////////////////////

// a. Use the same non-sensitive private key used in 3_signer.js.

// Your code here!
const singer = new ethers.Wallet(process.env.METAMASK_1_PRIVATE_KEY, notUniMaProvider);


// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async () => {

    let nextNonce = await singer.getNonce();
    console.log('nextNonce is: ' + nextNonce);
};

// getNonce();

// Checkpoint. Is the nonce in the (not) Unima blockchain different
// than in Goerli?


// Exercise 4. Check gas.
/////////////////////////

// a. Let's get some gas from the faucet. What is the faucet's address? 
// Check the slides in ILIAS.
// Hint: only accessible within UniMa network.

// b. Check your balance on UniMa network.

const checkBalance = async () => {

    let balance = await notUniMaProvider.getBalance(process.env.METAMASK_1_ADDRESS);
    console.log(ethers.formatEther(balance));

};

checkBalance();

// Exercise 5. Send a transaction.
//////////////////////////////////

// Send some Ether from one of your accounts to another one on NUMA.

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {

    tx = await singer.sendTransaction({
        to: account2,
        value: ethers.parseEther("0.9")
    })

    console.log('Transaction in mempool');
    await tx.wait();
    console.log('Transaction mined');
    console.log(tx);

};

// sendTransaction();

// Checkpoint. Can you send your ETH from NUMA to Goerli?

