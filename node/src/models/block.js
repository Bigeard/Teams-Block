const crypto = require('crypto');
const { db } = require('../utils/db');

class Block {
  constructor(id, previousBlockHash, previousProof, data, nonce) {
    this.id = id;
    this.proof = previousProof;
    this.hash = this.hashValue()
    this.previousBlockHash = previousBlockHash;
    this.data = data;
    this.timestamp = Date.now();
    this.nonce = nonce;

    
    const select = `SELECT * FROM blockchain WHERE id = ?;`
    db.all(select, [this.id], (err, rows) => {
      if (err) {
        throw err;
      }
      if (!rows[0]) {
        const insert = db.prepare(
          `INSERT INTO blockchain (id, hash, previous_hash, timestamp, contributing_node, data) VALUES (?,?,?,?,?,?)`
        );

        insert.run(
          this.id,
          this.hash,
          this.previousBlockHash,
          this.timestamp,
          1,
          JSON.stringify(this.data)
        );
      }
    });
  }

  hashValue() {
    const { id, proof, data, timestamp } = this;    
    const blockString= `${id}-${data}`;
    const hashFunction = crypto.createHash('sha256');
    hashFunction.update(blockString);
    return hashFunction.digest('hex');
  }

  setProof(proof) {
    this.proof = proof;
  }

  getProof() {
    return this.proof;
  }

  getHash() {
    return this.hash;
  }

  getNonce() {
    return this.nonce;
  }

  getId() {
    return this.id;
  }

  getPreviousBlockHash() {
    return this.previousBlockHash;
  }

  mineBlock(difficulty) {
    // while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
    //     this.hash = this.hashValue();
    //     this.nonce++;
    // }
    console.log("Block mined..." + this.hash);
  }

  getDetails() {
    const { id, proof, hash, previousBlockHash, data, timestamp } = this;
    return {
      id,
      proof,
      hash,
      previousBlockHash,
      data,
      timestamp,
    };
  }

  parseBlock(block) {
    this.id = block.id;
    this.proof = block.proof;
    this.previousBlockHash = block.previousBlockHash;
    this.timestamp = block.timestamp;
    return block.data
  }

  Datas() {
    this.data.forEach(data => console.log(data));
  }
}

module.exports = Block;
