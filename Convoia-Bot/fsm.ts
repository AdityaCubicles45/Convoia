import { t, StateMachine, ITransition } from "typescript-fsm";
//message file needed 
import { AskForCollection, AskForEvent, WelcomeMessage } from "./messages.js";
// query file needed
import { GetPOAPEvent, GetTokenHoldersByTokenAddress, checkCollectionExists, checkPoapEventExistence, getPoapEventInfo } from "./query.js";
//sendNFTData.js file needed 
import { sendImage, sendTokenInfo } from "./sendNFTData.js";




// created dispatch var things imported from message ,query , sendNFTData need to be created 
export const dispatch = async (context: any)=>{


}
