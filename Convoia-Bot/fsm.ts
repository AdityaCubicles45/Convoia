import { t, StateMachine, ITransition } from "typescript-fsm";
//message file needed 
import { AskForCollection, AskForEvent, WelcomeMessage } from "./messages.js";
// query file needed
import { GetPOAPEvent, GetTokenHoldersByTokenAddress, checkCollectionExists, checkPoapEventExistence, getPoapEventInfo } from "./query.js";
import { sendImage, sendTokenInfo } from "./sendNFTData.js";
//sendNFTData.js file needed 

enum States { waitingForUser = 0, waitingFirstInput};
enum Events { userLogin = 100, wrongInput, sendNFT, sendPOAP};


const transitions = [
    /* fromState        event                 toState         callback */
		t(States.waitingForUser,    Events.userLogin,        States.waitingFirstInput	),
        t(States.waitingFirstInput,   Events.wrongInput,  States.waitingFirstInput),

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
    switch(state){
        case States.waitingForUser:
            console.log("waitingForUser")
            await context.reply(WelcomeMessage);
            return fsm.dispatch(Events.userLogin);
        case States.waitingFirstInput:
            if (messageBody.toUpperCase() == "NFT") {
                await context.reply(AskForCollection)
                return fsm.dispatch(Events.sendNFT);
                }
            else if (messageBody.toUpperCase() == "EVENT") {
                await context.reply(AskForEvent);
                return fsm.dispatch(Events.sendPOAP);
            }
            else {
                await context.reply(`Sorry, I didn't understand that. Please type NFT`);
                return fsm.dispatch(Events.wrongInput);
            }        }


}
