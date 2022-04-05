import { createConnection } from "mysql";
import util from "util";

const connection = createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "accountdb",
});
const execQuery = util.promisify(connection.query.bind(connection));
const transferMoney = async() => {
    const AUTO_COMMIT_OFF = `SET AUTOCOMMIT = 0;`;
    const START = `START TRANSACTION;`;
    const ROLLBACK = `ROLLBACK;`;
    const COMMIT = `COMMIT;`;
    const AUTO_COMMIT_ON = `SET AUTOCOMMIT = 1;`;
    const CANCEL_FK_CHECK = `SET FOREIGN_KEY_CHECKS = 0;`;
    const UPDATE_ACCOUNT = `UPDATE account SET balance  = 4900 WHERE account_number = 101;`;
    const INSERT_TRANSFER = `INSERT INTO account_changes VALUES(2, 101, 100, '2022-04-05', 'money transfer successfully');`;

    try {
        await execQuery(AUTO_COMMIT_OFF);
        await execQuery(START);
        await execQuery(CANCEL_FK_CHECK);
        await execQuery(INSERT_TRANSFER);
        await execQuery(UPDATE_ACCOUNT);
        await execQuery(COMMIT);
        await execQuery(AUTO_COMMIT_ON);
    } catch (err) {
        console.log(err);
        execQuery(ROLLBACK);
    }
};

transferMoney();