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

}


async function check_if_an_address_is_on_the_network() {

}

async function start_a_new_conversation() {


}

async function send_a_message() {

}

async function stream_messages_in_a_conversation() {

}

async function stream_all_messages() {

}

function printQrCode() {


}