const Blockchain = require('./index');
const Block = require('./block')

describe("Blockchain", () => {
  let bc;
  let bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  })

  it('start with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'foo';
    bc.addBlock(data)
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  })

  it('validates a valid chain', () => {
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  })

  it('validates a genesis element', () => {
    bc2.chain[0].data = 'bad data';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  })

  it('validates a random element', () => {
    bc2.addBlock('foo')
    bc2.chain[1].data = 'not foo';
    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it('validates chain to replace', () => {
    bc2.addBlock('foo')
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  })

  it('does not replace the chain with one of less than or equal to lenght', () => {
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain)
  })

})