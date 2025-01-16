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
const mint = new PublicKey("HH86Vod2827iQS9rPc3uuw3GukLtnoishvY7UvvgXmQr");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        console.log(`Your ata is: ${ata.address.toBase58()}`); // 9abrG3k9NPvyQupVJCgz4EqNWaTbd7vyzQS8djMfPdWb

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, 100000000000)
        // txid N1Mw4tPLybUkgs8mTCNwosMzgpHEYa8Wcf2rD5CRDzNWf5fT8tqnBbY71VhSXLVgrTxUNpyGjg9XudF5SoDgTsy
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
