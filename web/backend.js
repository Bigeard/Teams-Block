const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("../database.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

let timestamp = `SELECT timestamp FROM blockchain WHERE data != '[]' AND id > 1`;
let text = `SELECT data FROM blockchain WHERE data != '[]' AND id > 1`;
let date = "";
let content = [];

db.all(timestamp, [], (err, time) => {
  if (err) {
    throw err;
  }
  time.forEach(line_time => {
    date = line_time;
    console.log(date);
  });
});

db.all(text, [], (err, text) => {
  if (err) {
    throw err;
  }
  text.forEach(text_line => {
    let data = JSON.parse(text_line.data);
    console.log([data]);
    
    content = content.concat(data);
  });

  
  console.log(content);
});

app.use(cors());
app.use(express.json());

// Envoi d'une page selon son numéro demandé
app.get("/page/:id", (req, res) => {
  console.log(req.params.id);
  console.log(content);
  const page = content.find(a => a.number+1 == req.params.id);
  console.log(page);
  page.date = date.timestamp;
  page.max = content.length;
  res.json(page);
});

app.listen(4000, () => console.log("Server started! 🎉"));
