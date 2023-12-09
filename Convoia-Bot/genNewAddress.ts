import { Wallet } from "ethers";

const randomWallet = Wallet.createRandom();
const privateKey: string = randomWallet.privateKey;
console.log("Set your environment variable: KEY=" + privateKey);