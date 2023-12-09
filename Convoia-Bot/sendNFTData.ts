import { Client } from '@xmtp/xmtp-js'
import { Web3Storage } from "web3.storage";
import { AttachmentCodec, RemoteAttachmentCodec, ContentTypeRemoteAttachment} from '@xmtp/content-type-remote-attachment'
import { Wallet } from 'ethers'
import Upload from './uploadFile.js';
import axios from 'axios'
import HandlerContext from "@xmtp/bot-starter/dist/HandlerContext.js";
import 'dotenv/config'



export const sendTokenInfo = async (context: any, data: any) => {
	//filter out tokens whose user has no XMTP
	const ethToken = data.ethereum.TokenBalance
	const polToken = data.polygon.TokenBalance
}