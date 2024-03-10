const mysql = require("mysql2");
require("dotenv").config();
let database_connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER, 
  password:  process.env.MYSQL_PASSWORD,
  database:  process.env.MYSQL_DATABASE,
}).promise();


async function fetchNotes() {
  try {
    const result = await database_connection.query("SELECT * FROM journal");
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function getJournalWithId(id){
  
  try{
    const [rows] = await database_connection.query(`
    SELECT *
    FROM journal
    WHERE id = ?
    `, [id]) 
    console.log(rows);
    return rows 
  }
  catch(error){
    console.error(error);
  }
}


getJournalWithId(4);


module.exports = database_connection;
