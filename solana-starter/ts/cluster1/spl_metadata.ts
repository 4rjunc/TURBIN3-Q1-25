import wallet from "../wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("HH86Vod2827iQS9rPc3uuw3GukLtnoishvY7UvvgXmQr")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
             mint,
             mintAuthority: signer,
         }

         let data: DataV2Args = {
             name: "Thorffin",
             symbol: "THOR",
             uri:"https://jbtvvzbsryxfzsfvkyia.supabase.co/storage/v1/object/public/solanamob/metadata.json",
             sellerFeeBasisPoints: 0,
             creators: null,
             collection: null,
             uses:null
         }

         let args: CreateMetadataAccountV3InstructionArgs = {
           data,
           isMutable: true,
           collectionDetails: null
         }

         let tx = createMetadataAccountV3(
             umi,
             {
                 ...accounts,
                 ...args
             }
         )

         let result = await tx.sendAndConfirm(umi);
         console.log(bs58.encode(result.signature));
         // https://explorer.solana.com/address/HH86Vod2827iQS9rPc3uuw3GukLtnoishvY7UvvgXmQr?cluster=devnet

         // tx b7rCYfRqfnh6DoHfR6dG23BDst61NmyxSr25wchfrZqecJZjd487BwiUmrJ9jv6YpMmpEjtARkGeNF1W54btZgu
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
