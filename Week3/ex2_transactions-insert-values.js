import { createConnection } from "mysql";
import util from "util";

const connection = createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "accountdb",
});
const execQuery = util.promisify(connection.query.bind(connection));
const seedDatabase = async () => {
	const CANCEL_FK_CHECK = "SET FOREIGN_KEY_CHECKS = 0;";
	const INSERT_ACCOUNT_TABLE = `INSERT INTO  account VALUES (101, 5000),(102, 3000),(103, 3000),(104, 6000),(105, 8000);`;
	const INSERT_ACCOUNT_CHANGES_TABLE = `INSERT INTO account_changes VALUES (1, 102, 1000, '2022-04-04', 'money transfer successfully')`;
	connection.connect();
	try {
		await execQuery(CANCEL_FK_CHECK);
		await execQuery(INSERT_ACCOUNT_TABLE);
		await execQuery(INSERT_ACCOUNT_CHANGES_TABLE);
	} catch (error) {
		console.log(error);
		connection.end();
	}
	connection.end();
};

seedDatabase();
