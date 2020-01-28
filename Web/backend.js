const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./database.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

let timestamp = `SELECT timestamp FROM Bloc `;
let text = `SELECT data FROM Bloc`;
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
    content = text_line.data;
    content = JSON.parse(content);

    console.log(content);
  });
});

app.use(cors());
app.use(express.json());

//Envoi d'une page selon son numéro demandé
app.get("/page/:id", (req, res) => {
  //   console.log(content);
  const page = content.find(a => a.number == req.params.id);
  console.log(page);
  page.date = date.timestamp;
  res.json(page);
});

app.listen(4000, () => console.log("Server started! 🎉"));
