const Block = require('./block');

const actions = require('../constants');

const { db } = require('../utils/db');

const { generateProof, isProofValid } = require('../utils/proof');

class Blockchain {
  constructor(blocks, io) {
    this.createTable();
    this.blocks = blocks || [new Block(0, 1, 0, [])];
    this.currentDatas = [];
    this.nodes = [];
    this.io = io;
  }

  createTable() {
    db.serialize(() => {
      // Queries scheduled here will be serialized.
      db.run(`
        CREATE TABLE IF NOT EXISTS blockchain (
          id int NOT NULL,
          hash text NOT NULL,
          previous_hash text, 
          timestamp date NOT NULL, 
          contributing_node int NOT NULL, 
          data text
        )`);
    })
  }

  addNode(node) {
    this.nodes.push(node);
  }

  mineBlock(block) {
    block.mineBlock(5);
    this.blocks.push(block);
    console.log('Mined Successfully');
    this.io.emit(actions.END_MINING, this.toArray());
  }

  async newData(data) {
    // this.currentDatas.push(data);
    this.currentDatas = data;
    // if (this.currentDatas.length === 5) {
      console.info('Starting mining block...');
      const previousBlock = this.lastBlock();
      process.env.BREAK = false;
      const block = new Block(previousBlock.getId() + 1, previousBlock.getHash(), previousBlock.getProof(), data);
      const { proof, dontMine } = await generateProof(previousBlock.getProof());
      block.setProof(proof);
      this.currentDatas = [];
      if (dontMine !== 'true') {
        this.mineBlock(block);
      }
    // }
  }

  lastBlock() {
    console.log(this.blocks[this.blocks.length - 1]);
    
    return this.blocks[this.blocks.length - 1];
  }

  getLength() {
    return this.blocks.length;
  }

  checkValidity() {
    const { blocks } = this;
    let previousBlock = blocks[0];
    for (let i = 1; i < blocks.length; i++) {
      const currentBlock = blocks[i];
      if (currentBlock.getPreviousBlockHash() !== previousBlock.hashValue()) {
        return false;
      }
      if (!isProofValid(previousBlock.getProof(), currentBlock.getProof())) {
        return false;
      }
      previousBlock = currentBlock;
    }
    return true;
  }

  parseChain(blocks) {
    this.blocks = blocks.map(block => {
      const parsedBlock = new Block(0);
      parsedBlock.parseBlock(block);
      return parsedBlock;
    });
  }

  toArray() {
    return this.blocks.map(block => block.getDetails());
  }
  printBlocks() {
    this.blocks.forEach(block => console.log(block));
  }
}

module.exports = Blockchain;
