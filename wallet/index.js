const { INITIAL_BALANCE } = require('../config')
const ChainUtil = require('../chain-util')

class Wallet {
  constructor() {
    this.initialBalance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');

  }

  toString() {
    return `Block - 
    balance : ${this.initialBalance}
    public key : ${this.publicKey}`
  }
}

module.exports = Wallet;