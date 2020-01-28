const fs = require('fs');
const path = require('path')
const pdf = require('pdf-parse');
const bookJSON = []

// Format PDF
function render_page(pageData) {
  let render_options = {
      normalizeWhitespace: false,
      disableCombineTextItems: false
  }

  return pageData.getTextContent(render_options)
  .then(function(textContent) {
      let text = '';
      for (let item of textContent.items) {
          if (!isNaN(item.str) && parseInt(item.str)){
            bookJSON.push({
              "text": text,
              "number": parseInt(item.str)
            })
          } 
          else {
            text += item.str;
          }
      }
      return;
  });
}

let options = {
  pagerender: render_page
}

let dataBuffer = fs.readFileSync(path.join(__dirname, 'book/Bel_Ami.pdf'));
pdf(dataBuffer, options).catch(function(err){
  // console.log(err);
});
// *** BOOK JSON ***

const app = require('express')();
const bodyParser = require('body-parser');
const httpServer = require('http').Server(app);
const axios = require('axios');
const io = require('socket.io')(httpServer);
const client = require('socket.io-client');

const BlockChain = require('./models/chain');
const SocketActions  = require('./constants');

const socketListeners = require('./socketListeners');

const { PORT } = process.env;

const blockChain = new BlockChain(null, io);

app.use(bodyParser.json());

// Import other server
app.post('/nodes', (req, res) => {
  const { host, port } = req.body;
  const { callback } = req.query;
  const node = `http://${host}:${port}`;
  const socketNode = socketListeners(client(node), blockChain);
  blockChain.addNode(socketNode, blockChain);
  if (callback === 'true') {
    console.info(`Added node ${node} back`);
    res.json({ status: 'Added node Back' }).end();
  } else {
    axios.post(`${node}/nodes?callback=true`, {
      host: req.hostname,
      port: PORT,
    });
    console.info(`Added node ${node}`);
    res.json({ status: 'Added node' }).end();
  }
});

// Data generation by number of page
app.post('/data', (req, res) => {
  let { number } = req.body;
  let data = []
  let num = number;

  for (num; num <= (number+5); num++) {
    data.push(bookJSON[num-2])
  }
  // blockChain.newData(data);
  io.emit(SocketActions.ADD_DATA, data);
  res.json({ message: 'data success', first_number: number, last_number: num-1}).end();
});

// Return Blockchain
app.get('/chain', (req, res) => {
  res.json(blockChain.toArray()).end();
});

io.on('connection', (socket) => {
  console.info(`Socket connected, ID: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Socket disconnected, ID: ${socket.id}`);
  });
});

blockChain.addNode(socketListeners(client(`http://localhost:${PORT}`), blockChain));

httpServer.listen(PORT, () => console.info(`Express server running on ${PORT}...`));
