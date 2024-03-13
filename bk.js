const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    calcHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
            //inside calculate the hash of this block
            this.hash=this.calcHash();
            this.nonce++; //increment the nonce as long as our hash doesn't start with enough zeros 
            console.log("Block mined "+this.hash );
        }
    }
}


//npm install --save crypto-js in the terminal\
class Blockchain{
    constructor(){
        this.chain= [this.createGenesisBlock()] ;
        this.difficulty=1; 
    }
    
    createGenesisBlock(){
    return new Block(0, "03/01/2009", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i<this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock= this.chain[i-1];
            if(prevBlock.hash != currentBlock.previousHash || currentBlock.hash != SHA256(currentBlock.index + currentBlock.previousHash + currentBlock.timestamp + JSON.stringify(currentBlock.data)).toString()) {
                return false;
            }
        }
        return true;
    }
}
  
let btCoin = new Blockchain();
console.log("Mining Block #1 ...");
btCoin.addBlock(new Block(1, "1/2/2022", 2));
console.log("Mining Block #2 ...");
btCoin.addBlock(new Block(2, "10/2/2012", 4));
console.log("Mining Block #3 ...");
btCoin.addBlock(new Block(3, "2/3/2021", 3));