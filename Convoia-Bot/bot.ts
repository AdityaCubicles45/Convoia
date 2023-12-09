import run from '@xmtp/bot-starter'

//@ts-ignore
import qrcode from 'qrcode-terminal'
import { dispatch } from './fsm.js'
import HandlerContext from '@xmtp/bot-starter/dist/HandlerContext.js';
import 'dotenv/config.js'

run(async(context:HandlerContext)=>{
    //HandlerContext help bot to decode 
    // the message sended by user
    console.log("Loading........");
    await dispatch (context);
    console.log("dispatched")
}).catch((err)=>{
    console.error(err);
});