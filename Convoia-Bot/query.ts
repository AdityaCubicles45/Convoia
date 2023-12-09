import { gql } from "graphql-request";
import { request} from 'graphql-request'

// Query to get the holders of tokens in a collection
export const GetTokenHolders = `gql`











export const GetTokenHoldersByTokenAddress = async (tokenAddress: string) =>  {
    const data = await request('https://api.airstack.xyz/gql', GetTokenHolders, { tokenAddress: tokenAddress, limit: 100, headers: {
      authorization: `Bearer MY_TOKEN`,
    }})
  
    return data;
  
  }

export const GetPOAPEventExists = gql`
    query CheckPoapEventExistence ($eventName: String!)) {
    PoapEvents(input: {filter: {eventName: {_eq: $eventName}}, blockchain: ALL}) {
    PoapEvent {
    id
    }
    }
}`;

  

export const checkPoapEventExistence = async (eventName : string) => {
    const data : any = await request('https://api.airstack.xyz/gql', GetPOAPEventExists, { eventName, headers: {
      Authorization : process.env.AIRSTACK_TOKEN || "",
    }})
    return data.PoapEvents.PoapEvent != null;
  
};
  