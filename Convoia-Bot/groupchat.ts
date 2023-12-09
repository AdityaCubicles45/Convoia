//Import libraries
import { Client } from '@xmtp/xmtp-js';
import { Wallet, type HDNodeWallet } from 'ethers';
//@ts-ignore
import qrcode from 'qrcode-terminal'


let wallet: HDNodeWallet | null = null;
let xmtp: Client;
const WALLET_TO = "0x93e2fc3e99dfb1238eb9e0ef2580efc5809c7204";
let conversation: any;