import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("5cRTjEdbBfzSXw94SGWpxxsbUMy5HYeV2r11XK6Y5HiR");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        console.log(`Your ata is: ${ata.address.toBase58()}`); // 4RrA4nQjnzV32VrSmSZQ33FWJMMsAemLYuU6wEq7fxDh

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, 100000000000)
        // txid 44LFE6C96wY1LQukdkBtJoinMibcQFVq14iWBX97yi5cr9u52FtnnEsQwRdBuRFbqgror6fEQLGqWgN7r4x9j3mV
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
