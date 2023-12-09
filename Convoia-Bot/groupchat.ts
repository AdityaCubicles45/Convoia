import run from '@xmtp/bot-starter'
import { AttachmentCodec, RemoteAttachmentCodec } from '@xmtp/content-type-remote-attachment';
import { Client } from '@xmtp/xmtp-js';
import 'dotenv/config'
import { Wallet, getDefaultProvider } from 'ethers';