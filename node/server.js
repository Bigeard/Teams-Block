const fs = require('fs');
const path = require('path')
const pdf = require('pdf-parse');
const bookJSON = []


function render_page(pageData) {
  //check documents https://mozilla.github.io/pdf.js/
  let render_options = {
      //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: false,
      //do not attempt to combine same line TextItem's. The default value is `false`.
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
pdf(dataBuffer, options).then(function(data) {
  console.log(bookJSON);
}).catch(function(err){
  console.log(err);
});


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

app.post('/data', (req, res) => {
  const { text, number } = req.body;
  io.emit(SocketActions.ADD_DATA, text, number);
  res.json({ message: 'data success' }).end();
});

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
