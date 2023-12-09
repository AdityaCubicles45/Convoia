import { t, StateMachine, ITransition } from "typescript-fsm";
//message file needed 
import { AskForCollection, AskForEvent, WelcomeMessage } from "./messages.js";
// query file needed
import { GetPOAPEvent, GetTokenHoldersByTokenAddress, checkCollectionExists, checkPoapEventExistence, getPoapEventInfo } from "./query.js";
import { sendImage, sendTokenInfo } from "./sendNFTData.js";
//sendNFTData.js file needed 

enum States { waitingForUser = 0, waitingFirstInput, waitingForEventName ,waitingForCollectionName,};
enum Events { userLogin = 100, wrongInput, sendNFT, sendPOAP , backToTop, proposeGroupChat , retry};


const transitions = [
    /* fromState        event                 toState         callback */
		t(States.waitingForUser,    Events.userLogin,        States.waitingFirstInput	),
        t(States.waitingFirstInput,   Events.wrongInput,  States.waitingFirstInput),
        t(States.waitingFirstInput,   Events.sendNFT,  States.waitingForCollectionName),


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
            await context.reply(`Sorry, I couldn't find any event similar ${messageBody}. Please try again with the exact name`);
			return fsm.dispatch (Events.retry);
        case States.waitingForCollectionName:
            if (messageBody == "") {
                return fsm.dispatch(Events.backToTop);
            }
            else {
                const [ matched, indications, error] = await checkCollectionExists(messageBody);
                if (matched) {
                    await context.reply(`Fetching tokens for ${indications}`);
                    const data = await GetTokenHoldersByTokenAddress(error);

                    await sendTokenInfo(context, data);
                    await context.reply(`Going to sleep now. Send me a message to wake me up!`);
                    fsm.dispatch (Events.backToTop);
                } else {
                    if (error) {
                        await context.reply(`Sorry, something went wrong. Please try again`);
                        return fsm.dispatch (Events.backToTop);
                    }
                    if (indications) {
                        await context.reply(`Sorry, I couldn't find any collection similar to ${messageBody}. Did you mean any of ${indications}? Please try again`);
                        return fsm.dispatch (Events.retry);
                    }
                    else {
                        await context.reply(`Sorry, I couldn't find any collection similar to ${messageBody}. Please try again`);
                        return fsm.dispatch (Events.retry);
                    }
                }
            }

        
        }


}
