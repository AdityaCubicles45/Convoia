import run from '@xmtp/bot-starter'
import { AttachmentCodec, RemoteAttachmentCodec } from '@xmtp/content-type-remote-attachment';
import { Client } from '@xmtp/xmtp-js';
import 'dotenv/config'
import { Wallet, getDefaultProvider } from 'ethers';

process.env.KEY = process.env.GROUPCHAT_KEY|| ""

console.log("process.env.KEY", process.env.KEY)
const wallet = new Wallet(process.env.KEY);


const client = await Client.create(wallet, { env: 'production' })
client.registerCodec(new AttachmentCodec())
client.registerCodec(new RemoteAttachmentCodec())

const provider = getDefaultProvider('homestead');

run (async (context)=>{
    const sender = context.message.senderAddress;
	const messageBody = context.message.content;
	const senderName = await provider.lookupAddress(sender) || sender;
	const withAddress = `${senderName} says : \n${messageBody}`
    if (userlist.includes(sender)) {
		const filterList = userlist.filter((user) => user != sender);
		for (const user of filterList) {
			const convo = await client.conversations.newConversation(user)
			await convo.send(withAddress)
		}

	} else {
		await context.reply(`Sorry, you are not authorized to use this bot`);
	}
})