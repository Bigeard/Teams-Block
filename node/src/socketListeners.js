const SocketActions = require('./constants');

const Blockchain = require('./models/chain');

const socketListeners = (socket, chain) => {
  socket.on(SocketActions.ADD_DATA, (data) => {
    chain.newData(data);
    // console.info(`Added data: ${JSON.stringify(data, null, '\t')}`);
  });

  socket.on(SocketActions.END_MINING, (newChain) => {
    console.log('End Mining encountered');
    process.env.BREAK = true;
    const blockChain = new Blockchain();
    blockChain.parseChain(newChain);
    if (blockChain.checkValidity() && blockChain.getLength() >= chain.getLength()) {
      chain.blocks = blockChain.blocks;
    }
  });

  return socket;
};

module.exports = socketListeners;
