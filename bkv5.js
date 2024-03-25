const SHA256 = require('crypto-js/sha256');


class Transaction{
    
    constructor(fromAddress, toAddress, amount){
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }
}


class Block {
 
    constructor(timestamp, transactions, previousHash ='')
  {
   this.timestamp=timestamp;
   this.transactions=transactions;
   this.previousHash = previousHash;
   this.hash = this.calcHash();
   this.nonce=0;
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


class Blockchain{
    
    constructor(){
      this.chain=[this.createGenesisBlock()];
      this.difficulty=3;  // set the difficulty level to 1 for now
      this.pendingTransactions=[];
      this.miningReward=50;
    }
    
    //How do we create the first block?
    createGenesisBlock(){
      return new Block(0,"03/01/2022", "Genesis Block", "0");
    }
    
    getLatestBlock(){
    return this.chain[this.chain.length-1];
}

minePendingTransactions(miningRewardAddress){
    let block = new Block(Date.now(),this.pendingTransactions);
    block.mineBlock(this.difficulty);
    console.log("Block successfully mined");
    this.chain.push(block);
    this.pendingTransactions=[
        new Transaction(null,miningRewardAddress,this.miningReward)
    ];
}
  
createTransaction(transaction){
    this.pendingTransactions.push(transaction);
  }

  getExtraReward(max){
    return Math.floor(Math.random()*max);
} 
  
    //create a method that checks the balance of an address
    getBalanceOfAddress(address){
        // TYPE THE CODE => balance starts at 0
        let balance = 0;
        // loop over each block of this chain ( Hint: for..of loop)
        // loop over each transaction of this block ( Hint: nested for..of loop)
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress===address){
                    balance -= trans.amount;
                }
                if(trans.toAddress===address){
                    balance += trans.amount;
                }
            }
        }
        
        if(balance > 50) {
            console.log("You are eligible to get a reward.");
            console.log('Press Y to spin the wheel and get a random value between 3 to 100 coins added to your account'); 
            let reward = this.getExtraReward(50);
            console.log('You got an extra ' + reward + ' coins!');
            balance += reward;
            console.log('Your updated value is ' +  balance);
        }

        return balance;
    }

      
} // end of Blockchain class


// create a name for your digital coin
let _nameOfYourCOin= new Blockchain();
// send 90 coins from address 1 to address 2  
_nameOfYourCOin.createTransaction(new Transaction('address1', 'address2', 90));
//continue and TYPE code to send 60 coins from address 2 to 1
_nameOfYourCOin.createTransaction(new Transaction('address2', 'address1', 60));
//next TYPE code to send 100 coins from address 2 to 1
_nameOfYourCOin.createTransaction(new Transaction('address2', 'address1', 100));
//after we create those transactions, they will be pending
console.log('\nStarting miner 1..');
// TYPE THE CODE to apply the method minePendingTransactions (‘Alice-address’) to your coin
_nameOfYourCOin.minePendingTransactions('Alice-address');

console.log("Reward balance of Alice is " + _nameOfYourCOin.getBalanceOfAddress('Alice-address'));
// _nameOfYourCOin.minePendingTransactions('Alice-address');

_nameOfYourCOin.minePendingTransactions('Alice-address');
_nameOfYourCOin.minePendingTransactions('Alice-address');

console.log("Reward balance of Alice is " + _nameOfYourCOin.getBalanceOfAddress('Alice-address'));


