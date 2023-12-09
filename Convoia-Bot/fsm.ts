import { t, StateMachine, ITransition } from "typescript-fsm";
import { AskForCollection, AskForEvent, WelcomeMessage } from "./messages.js";
import { GetPOAPEvent, GetTokenHoldersByTokenAddress, checkCollectionExists, checkPoapEventExistence, getPoapEventInfo } from "./query.js";
import { sendImage, sendTokenInfo } from "./sendNFTData.js";