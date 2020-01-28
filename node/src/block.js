const crypto = require('crypto');

class Block {
    constructor(id, previousBlockHash, previousProof, data) {
        this.id = id;
        this.proof = previousProof;
        this.previousBlockHash = previousBlockHash;
        this.data = data;
        this.timestamp = Date.now();
    }