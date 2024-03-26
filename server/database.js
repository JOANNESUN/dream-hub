const mysql = require("mysql2");
require("dotenv").config();


// data base connection is set up here 
let database_connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER, 
  password:  process.env.MYSQL_PASSWORD,
  database:  process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();


// keep this to test if mysql database is connected with node
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
