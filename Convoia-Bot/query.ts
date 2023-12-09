import { gql } from "graphql-request";
import { request} from 'graphql-request'
import axios from 'axios';

// Query to get the holders of tokens in a collection
export const GetTokenHolders = gql`query GetTokenHolders($tokenAddress: Address, $limit: Int) {
    ethereum: TokenBalances(
      input: {filter: {tokenAddress: {_eq: $tokenAddress}}, blockchain: ethereum, limit: $limit}
    ) {
      TokenBalance {
        tokenAddress
        tokenId
        blockchain
        tokenType
        token {
          name
          symbol
          logo {
            medium
            small
          }
          projectDetails {
            imageUrl
          }
        }
        tokenNfts {
          contentValue {
            video
            image {
              small
              original
              medium
              large
              extraSmall
            }
          }
        }
        owner {
          identity
          addresses
          socials {
            blockchain
            dappSlug
            profileName
          }
          primaryDomain {
            name
          }
          domains {
            chainId
            dappName
            name
          }
          xmtp {
            isXMTPEnabled
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
    polygon: TokenBalances(
      input: {filter: {tokenAddress: {_eq: $tokenAddress}}, blockchain: polygon, limit: $limit}
    ) {
      TokenBalance {
        tokenAddress
        tokenId
        blockchain
        tokenType
        token {
          name
          symbol
          logo {
            medium
            small
          }
          projectDetails {
            imageUrl
          }
        }
        tokenNfts {
          contentValue {
            video
            image {
              small
              original
              medium
              large
              extraSmall
            }
          }
        }
        owner {
          identity
          addresses
          socials {
            blockchain
            dappSlug
            profileName
          }
          primaryDomain {
            name
          }
          domains {
            chainId
            dappName
            name
          }
          xmtp {
            isXMTPEnabled
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }`;

  
  export const GetTokenHoldersByTokenAddress = async (tokenAddress: string) =>  {
      const data = await request('https://api.airstack.xyz/gql', GetTokenHolders, {
         tokenAddress: tokenAddress, 
         limit: 100, 
         headers: {
        authorization: `Bearer MY_TOKEN`,
      }
    });
    
      return data;
    
    }

    
    export async function fetchMentionOptions(
        query: string,
        limit: number
        ): Promise<[null | any, null | string]> {
            try{
                const response = await axios.post('https://bff-prod.airstack.xyz/graphql', {
                operationName: 'SearchAIMentions',
                query: MentionsQuery,
                variables: {
                    input: {
                        searchTerm: query,
                        limit
                    }
                }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;

        if (data.errors) {
            return [null, data.errors[0].message];
        }
        
        return [data, null]
    }catch(error:any){
        return [null, error.message || 'Something went wrong'];
    

    }
}

export const MentionsQuery = gql`
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
  
  
export const checkCollectionExists = async (collectionName : string) => {
    let [data, error] = await fetchMentionOptions (collectionName, 10);
    if (error) {
      return [false, null, error];
    }
    let result = data?.SearchAIMentions;
    let resultNames = result?.map ((x : any) => x.name.toLowerCase());
		if (result && result.length > 0) {
            let index = resultNames?.indexOf(collectionName.toLowerCase());
			if (index != -1) {
				return [true, result[index].name, result[index].address];
			} else {
				return [false, result.map ((x : any) => `"${x.name}"`).join(", "), null];
			}
		} else {
			return [false, null, null];
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
export const GetPOAPEvent = gql`
query MyQuery ($eventName: String!) {
  PoapEvents(
    input: {filter: {eventName: {_eq: $eventName}}, blockchain: ALL}
  ) {
    PoapEvent {
      eventName
      eventId
      startDate
      endDate
      country
      city
      isVirtualEvent
      contentValue {
        image {
          extraSmall
          large
          medium
          original
          small
        }
      }
      poaps {
        owner {
          addresses
        }
      }
    }
  }
}`;


  
export const getPoapEventInfo = async (eventName : string) => {
    const data : any = await request('https://api.airstack.xyz/gql', GetPOAPEvent, { eventName, headers: {
    authorization: `Bearer MY_TOKEN`,
  }})
  return data;
}
