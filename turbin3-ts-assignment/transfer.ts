import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  PublicKey,
  TransactionMessage,
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ");
//const to = new PublicKey("6X4G9p5kiE6tDXkBHfpqispJ2B6YfAA3tBGcKvaXaht2"); this is the address I gave in turbine application form
const connection = new Connection("https://api.devnet.solana.com");

// 🔴 Below code is to transfer 0.1 sol to turbine address

// (async () => {
//   try {
//     const transaction = new Transaction().add(
//       SystemProgram.transfer({
//         fromPubkey: from.publicKey,
//         toPubkey: to,
//         lamports: 0.1 * LAMPORTS_PER_SOL,
//       }),
//     );
//
//     transaction.recentBlockhash = (
//       await connection.getLatestBlockhash("confirmed")
//     ).blockhash;
//     transaction.feePayer = from.publicKey;
//
//     const signature = await sendAndConfirmTransaction(connection, transaction, [
//       from,
//     ]);
//     console.log(
//       `Success! Check out transaction here: https://explorer.solana.com/tx/${signature}?cluster=devnet`,
//     );
//   } catch (e) {
//     console.error(`Oops, something went wrong: ${e}`);
//   }
// })();

// 🔴 Below code is to drain the keypair sol to turbine address
(async () => {
  try {
    // get balance
    const balance = await connection.getBalance(from.publicKey);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
      }),
    );

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = from.publicKey;

    // calculate the fee
    const fee =
      (
        await connection.getFeeForMessage(
          transaction.compileMessage(),
          "confirmed",
        )
      ).value || 0;

    // remove the transfer instruction
    transaction.instructions.pop();

    // replacing transaction instruction with the correct amount of lamports
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee,
      }),
    );

    // Sign transaction, broadcast and confirmed
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);
    console.log(
      `Success! Check out transaction here: https://explorer.solana.com/tx/${signature}?cluster=devnet`,
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
