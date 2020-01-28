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

    lastBlock() {
        return this.blocks[this.blocks.length - 1];
    }

    getLength() {
        return this.blocks.length;
    }

    checkValidity() {
        const {
            blocks
        } = this;
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