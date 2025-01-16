import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("HH86Vod2827iQS9rPc3uuw3GukLtnoishvY7UvvgXmQr");

// Recipient address
const to = new PublicKey("EbN3JqZ2EKGGVagmvQpUuUPopEMDaXq4yXbLNqhaXEZD");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const from_ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        console.log(`Your ata (fromWallet) is: ${from_ata.address.toBase58()}`); 


        // Get the token account of the toWallet address, and if it does not exist, create it
        const to_ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to)
        console.log(`Your ata (toWallet) is: ${to_ata.address.toBase58()}`); 

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(
          connection,
          keypair,
          from_ata.address,
          to_ata.address,
          keypair,
          10e9
        )

        console.log("Tx Success:", tx);
        // https://explorer.solana.com/tx/5ie1oUJSew7ao9V4cAzyJyRZLqs21h6tG5hAJk1e7c2XyKdkUVFk8VEBDbXDbbh8kfY4r3kF7z2DEEpsi6xSo4Wi?cluster=devnet
        
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
