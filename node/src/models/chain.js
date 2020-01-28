const Block = require('./block');

const actions = require('../constants');

const {
    generateProof,
    isProofValid
} = require('../utils/proof');

class Blockchain {
    constructor(blocks, io) {
        this.blocks = blocks || [new Block(0, 1, 0, [])];
        this.currentDatas = [];
        this.nodes = [];
        this.io = io;
    }

    addNode(node) {
        this.nodes.push(node);
    }

    mineBlock(block) {
        this.blocks.push(block);
        console.log('Mined Successfully');
        this.io.emit(actions.END_MINING, this.toArray());
    }

    async newData(data) {
        this.currentDatas.push(data);
        if (this.currentDatas.length === 5) {
            console.info('Starting mining block...');
            const previousBlock = this.lastBlock();
            process.env.BREAK = false;
            const block = new Block(previousBlock.getId() + 1, previousBlock.hashValue(), previousBlock.getProof(), this.currentDatas);
            const {
                proof,
                dontMine
            } = await generateProof(previousBlock.getProof());
            block.setProof(proof);
            this.currentDatas = [];
            if (dontMine !== 'true') {
                this.mineBlock(block);
            }
        }
    }