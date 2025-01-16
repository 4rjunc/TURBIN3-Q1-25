import wallet from "../wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/5wceMgDuhQFjJWRPpm2XdAR1GjScXAQuapD4uGCG22kY"
         const metadata = {
             name: "GENERUG",
             symbol: "RUG",
             description: "This is an random image",
             image: image,
             attributes: [
                 {trait_type: 'random', value: 'yes'}
             ],
             properties: {
                 files: [
                     {
                         type: "image/png",
                         uri: image
                     },
                 ]
             },
             creators: []
         };
         const myUri = await umi.uploader.uploadJson(metadata).catch((err) =>{
           throw new Error(err);
         })
         console.log("Your metadata URI: ", myUri);
         // https://devnet.irys.xyz/DHxQuQhdcJEbcfeDpA9zHtebXaA8LJVBwMBZgMPFjBqp
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
