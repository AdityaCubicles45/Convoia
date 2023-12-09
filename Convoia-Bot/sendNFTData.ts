import { Client } from '@xmtp/xmtp-js'
import { Web3Storage } from "web3.storage";
import { AttachmentCodec, RemoteAttachmentCodec, ContentTypeRemoteAttachment} from '@xmtp/content-type-remote-attachment'
import { Wallet } from 'ethers'
import Upload from './uploadFile.js';
import axios from 'axios'
import HandlerContext from "@xmtp/bot-starter/dist/HandlerContext.js";
import 'dotenv/config'

export const sendImage = ()=>{

}

export const sendTokenInfo = async (context: any, data: any) => {
	//filter out tokens whose user has no XMTP
	const ethToken = data.ethereum.TokenBalance
	const polToken = data.polygon.TokenBalance
    if (ethToken) {
		await context.reply(`Here are the top token found on Ethereum:`);
		for (const id in ethToken) {
			const token = ethToken[id]
			let image = token.tokenNfts.contentValue.image.original;
			console.log("image", image)
			let owner = token.owner;
			console.log("owner", owner)
			await sendImage(context,image);
			await context.reply(`Owned by address: ${owner.identity}, hasXMTP: ${owner.xmtp ? "true" : "false"}`);
		}
	}
	if (polToken) {
		await context.reply(`Here are the top token found on Polygon:`);
		console.log("token on polygons")
		console.dir(polToken)
		for (const id in polToken) {
			const token = polToken[id]
			let image: string = token.tokenNfts.contentValue.image.original;
			console.log("image", image)
			let owner = token.owner;
			console.log("owner", owner)
			await sendImage(context,image);
			await context.reply(`Owned by address: ${owner.identity}, hasXMTP: ${owner.xmtp ? "true" : "false"}`);
		}
	}
}