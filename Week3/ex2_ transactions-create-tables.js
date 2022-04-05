import util from "util";
import { createConnection } from "mysql";

const connection = createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
    const DROP_DATABASE = ` DROP DATABASE IF EXISTS accountdb;`;
    const CREATE_ACCOUNT_DB = `CREATE DATABASE IF NOT EXISTS accountdb;`;
    const USE_ACCOUNT_DB = `USE accountdb`;
    const CREATE_ACCOUNT_TABLE = `CREATE TABLE IF NOT EXISTS account(
		account_number INT PRIMARY KEY,
		balance INT);`;
    const CREATE_ACCOUNT_CHANGES_TABLE = `CREATE TABLE IF NOT EXISTS account_changes(
		change_number INT PRIMARY KEY,
		account_number INT,
		amount INT,
		changed_date DATE,
		remark TEXT,
		CONSTRAINT fk_accNum 
		FOREIGN KEY (account_number) REFERENCES account(account_number)
	);`;
    connection.connect();
    try {
        await execQuery(DROP_DATABASE);
        await execQuery(CREATE_ACCOUNT_DB);
        await execQuery(USE_ACCOUNT_DB);
        await execQuery(CREATE_ACCOUNT_TABLE);
        await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
    } catch (error) {
        console.log(error);
        connection.end();
    }
    connection.end();
}
seedDatabase();