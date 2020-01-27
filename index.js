const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

let jour = Date.now

db.serialize(() => {
    // Queries scheduled here will be serialized.
    db.run(`
    CREATE TABLE IF NOT EXISTS Bloc(
      id int NOT NULL,
      hash text NOT NULL,
      previous_hash text, 
      timestamp date NOT NULL, 
      contributing_node int NOT NULL, 
      list_hash text NOT NULL, 
      data text NOT NULL
    )`)
          
    .run(
      `INSERT INTO Bloc (id, hash, previous_hash, timestamp, contributing_node, list_hash, data) VALUES (?),(?),(?),(?),(?),(?),(?)`,
        [1],['hash1'],['NULL'],[jour],[1],['hash1'],['{nbpage : 2 ,text: lorem ipsum}'])
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
  
      db.close();
  
    });

 
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});