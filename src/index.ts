import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash =  (
    index : number,
    previousHash: string,
    timestamp: number,
    data: string,
  ): string =>
   CryptoJS.SHA256(index + previousHash + timestamp + data ).toString();

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number,
  ){
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlcok: Block = new Block(0, "103489039487129", "", "hello", 20200212)

let blockchain: Block[] = [genesisBlcok];

const getBlockchain = (): Block[] => blockchain;

const getLastestBlock = (): Block => blockchain[blockchain.length -1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() /1000);

const createNewBlcok = (data: string): Block => {
  const previousBlock : Block = getLastestBlock();
  const newIndex : number = previousBlock.index + 1;
  const newTimestamp : number = getNewTimestamp();
  const newHash : string = Block.calculateBlockHash(
    newIndex, previousBlock.hash, newTimestamp, data
    );
  const newBlock : Block = new Block(
    newIndex, newHash, previousBlock.hash, data, newTimestamp
    );
    return newBlock;
}

console.log(createNewBlcok("hello"), createNewBlcok("bye bye"))


export {};