import { t, StateMachine, ITransition } from "typescript-fsm";
//message file needed 
import { AskForCollection, AskForEvent, WelcomeMessage } from "./messages.js";
// query file needed
import { GetPOAPEvent, GetTokenHoldersByTokenAddress, checkCollectionExists, checkPoapEventExistence, getPoapEventInfo } from "./query.js";
import { sendImage, sendTokenInfo } from "./sendNFTData.js";
//sendNFTData.js file needed 

enum States { waitingForUser = 0, waitingFirstInput, waitingForEventName};
enum Events { userLogin = 100, wrongInput, sendNFT, sendPOAP , backToTop, proposeGroupChat};


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
            }        
        case States.waitingForEventName:
            if (messageBody == "") {
                return fsm.dispatch(Events.backToTop);
            }
            
            const eventExist = await checkPoapEventExistence(messageBody);
            if (eventExist) {
                await context.reply(`Fetching data for event ${messageBody}`);
                const data = await getPoapEventInfo(messageBody);

                const poapEvent = data.PoapEvents.PoapEvent[0];
                // await context.reply(`Found ${JSON.stringify(data)}`);
                await sendImage(context, poapEvent.contentValue.image.original);
                await context.reply(`${poapEvent.eventName} was a great event \n \
                it took place in ${poapEvent.city},${poapEvent.country} \n
                    from ${poapEvent.startDate} to ${poapEvent.endDate} \n`);
                await context.reply(`I found ${poapEvent.poaps.length} attendees. \n
                Would you like to start a group chat with them ?`)
                return fsm.dispatch (Events.proposeGroupChat);
            }
        
        }


}
