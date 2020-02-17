"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
const genesisBlcok = new Block(0, "103489039487129", "", "hello", 20200212);
let blockchain = [genesisBlcok];
const getBlockchain = () => blockchain;
const getLastestBlock = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlcok = (data) => {
    const previousBlock = getLastestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    return newBlock;
};
console.log(createNewBlcok("hello"), createNewBlcok("bye bye"));
//# sourceMappingURL=index.js.map