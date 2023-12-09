//Import libraries
import { Client } from '@xmtp/xmtp-js';
import { Wallet, type HDNodeWallet } from 'ethers';
//@ts-ignore
import qrcode from 'qrcode-terminal'


let wallet: HDNodeWallet | null = null;
let xmtp: Client;
const WALLET_TO = "0x93e2fc3e99dfb1238eb9e0ef2580efc5809c7204";
let conversation: any;

async function initialize_the_wallet() {
    // You'll want to replace this with a wallet from your application
    wallet = Wallet.createRandom();
    console.log(`Wallet address: ${wallet.address}`);
    return wallet;
  }
  
async function create_a_client() {
  if (!wallet) {
    console.log("Wallet is not initialized");
    return
  }

  xmtp = await Client.create(wallet, { env: "production" });
  console.log("Client created", xmtp.address);
}


async function check_if_an_address_is_on_the_network() {
//Message this XMTP message bot to get an immediate automated reply:
  //gm.xmtp.eth (0x937C0d4a6294cdfa575de17382c7076b579DC176) env:production
  if (xmtp) {
    const isOnDevNetwork = await xmtp.canMessage(WALLET_TO);
    console.log(`Can message: ${isOnDevNetwork}`);
  }
}

async function start_a_new_conversation() {
  if (xmtp) {
    conversation = await xmtp.conversations.newConversation(WALLET_TO);
    console.log(`Conversation created with ${conversation.peerAddress}`);
  }
}

async function send_a_message() {
  if (conversation) {
    const message = await conversation.send("gm");
    console.log(`Message sent: "${message.content}"`);
    return message;
  }
}

async function stream_messages_in_a_conversation() {

}

async function stream_all_messages() {

}

function printQrCode() {


}

await initialize_the_wallet();
await create_a_client();
await check_if_an_address_is_on_the_network();
await start_a_new_conversation();
await send_a_message();
await stream_all_messages()

//Run it whenever needed
//await stream_messages_in_a_conversation();
