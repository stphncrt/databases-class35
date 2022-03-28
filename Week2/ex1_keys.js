import util from 'util';
import mysql from 'mysql';

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: 'bookdb',
})

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async() => {
    const CREATE_BOOKDB = `
    CREATE DATABASE IF NOT EXISTS bookdb;`;
    const CREATE_AUTHORS_TABLE = `   
      CREATE TABLE IF NOT EXISTS authors(
        author_no INT PRIMARY KEY, 
        author_name VARCHAR(50), 
        university TEXT, 
        date_of_birth DATE, 
        h_index INT,
        gender ENUM('m','f'));`;
    const ADD_AUTHORS_TABLE = `
        ALTER TABLE authors ADD mentor INT;
        `;
    const ADD_FOREIGN_KEY_AUTHORS_TABLE = `
        ALTER TABLE authors ADD FOREIGN KEY(mentor) REFERENCES authors(author_no)  ;
    `;
    connection.connect()

    try {
        await execQuery(CREATE_BOOKDB);
        await execQuery(CREATE_AUTHORS_TABLE);
        await execQuery(ADD_AUTHORS_TABLE);
        await execQuery(ADD_FOREIGN_KEY_AUTHORS_TABLE);
    } catch (err) {
        console.log(err);
        connection.end();
    }
    connection.end();
}

seedDatabase();