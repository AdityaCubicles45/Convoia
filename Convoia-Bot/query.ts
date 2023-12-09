import { gql } from "graphql-request";
import { request} from 'graphql-request'
const axios = require('axios');

// Query to get the holders of tokens in a collection
export const GetTokenHolders = `gql`

export async function fetchMentionOptions(
    query: string,
    limit: number
    ): Promise<[null | any, null | string]> {
    try{
        axios.post('https://bff-prod.airstack.xyz/graphql',{
            method: 'POST',
            body: JSON.stringify({
              operationName: 'SearchAIMentions',
              query: MentionsQuery,
              variables: {
                input: {
                  searchTerm: query,
                  limit
                }
              }
            }),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        
    }catch(err:any){
        return [null, error?.message || 'Something went wrong'];

    }
    }

export const MentionsQuery = `
    query SearchAIMentions($input: SearchAIMentionsInput!) {
      SearchAIMentions(input: $input) {
        type
        name
        address
        eventId
        blockchain
        thumbnailURL
      }
    }
  `;


export const GetTokenHoldersByTokenAddress = async (tokenAddress: string) =>  {
    const data = await request('https://api.airstack.xyz/gql', GetTokenHolders, { tokenAddress: tokenAddress, limit: 100, headers: {
      authorization: `Bearer MY_TOKEN`,
    }})
  
    return data;
  
  }

export const checkCollectionExists = async (collectionName : string) => {
    let [data, error] = await fetchMentionOptions (collectionName, 10);
    if (error) {
      return [false, null, error];
    }
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
  