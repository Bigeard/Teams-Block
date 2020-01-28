const sqlite3 = require("sqlite3").verbose();

// open database in memory
const db = new sqlite3.Database("./database.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

// // close the database connection
// db.close(err => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("Close the database connection.");
// });

exports.db = db;