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

  