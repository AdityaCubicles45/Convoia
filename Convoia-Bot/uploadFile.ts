import { Filelike } from "web3.storage";

export default class Upload implements Filelike {
    name: string;
    data: Uint8Array;
  
    constructor(name: string, data: Uint8Array) {
      this.name = name;
      this.data = data;
    }
    stream: () => ReadableStream{
        
    };
}