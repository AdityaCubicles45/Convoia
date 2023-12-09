import { t, StateMachine, ITransition } from "typescript-fsm";
//message file needed 
import { AskForCollection, AskForEvent, WelcomeMessage } from "./messages.js";
// query file needed
import { GetPOAPEvent, GetTokenHoldersByTokenAddress, checkCollectionExists, checkPoapEventExistence, getPoapEventInfo } from "./query.js";
import { sendImage, sendTokenInfo } from "./sendNFTData.js";
//sendNFTData.js file needed 


enum States{waitingForUser=0}
enum Events{};

const transitions = [
        
];


const fsm = new StateMachine<States,Events>(
    States.waitingForUser,   // initial state
    transitions ,     // array of transitions
)

// created dispatch var things imported from message ,query , sendNFTData need to be created 
export const dispatch = async (context: any)=>{
    const messageBody = context.message.content;
    //geting state and event from fsm
    const state = fsm.getState();
    //state will come from enum
    console.log("state", state)



}
