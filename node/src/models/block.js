const crypto = require('crypto');

class Block {
    constructor(id, previousBlockHash, previousProof, data) {
        this.id = id;
        this.proof = previousProof;
        this.previousBlockHash = previousBlockHash;
        this.data = data;
        this.timestamp = Date.now();
    }

	hashValue() {
	const { id, proof, data, timestamp } = this;
	const blockString= `${id}-${proof}-${JSON.stringify(data)}-${timestamp}`;
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

	getId() {
	return this.id;
	}

	getPreviousBlockHash() {
	return this.previousBlockHash;
	}


	getDetails() {
	const { id, proof, previousBlockHash, data, timestamp } = this;
	return {
	  id,
	  proof,
	  timestamp,
	  previousBlockHash,
	  data: data.map(data => data),
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
