const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(timestamp, transactions, previousHash = "") {
        this.timestamp = timestamp;
        this.transactions = transactions;
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
        this.difficulty=3; 
        this.pendingTransactions = [];
        this.miningReward = 50;
    }
    
    createGenesisBlock(){
    return new Block(0, "03/01/2022", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    minePendingTransactions(miningRewardsAddress) {
        let block = new Block (Date.now(), this.pendingTransactions);
        //mine block
        block.mineBlock(this.difficulty);
        console.log("Block successfully mined");
        this.chain.push(block);

        //resetts pending transactions
        this.pendingTransactions = [ new Transcation(null, miningRewardsAddress, this.miningReward)];
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    //checks the balance of the address
    getBalanceOfAddress(address){
        balance  = 0;
        for(i = 0; i < )
    } 
}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
  
let btCoin = new Blockchain();
console.log("Mining Block #1 ...");
btCoin.addBlock(new Block(1, "1/2/2022", 2));
console.log("Mining Block #2 ...");
btCoin.addBlock(new Block(2, "10/2/2012", 4));
console.log("Mining Block #3 ...");
btCoin.addBlock(new Block(3, "2/3/2021", 3));