import mysql from "mysql";
const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "new_world",
});

connection.connect();

const resultHandler = (err, result) => {
	if (err) throw err;
	console.log(result);
};
connection.query("SELECT Name FROM country WHERE Population > 8000000;", resultHandler);

connection.query("SELECT Name FROM country WHERE Name LIKE '%land%'", resultHandler);

connection.query(
	"SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
	resultHandler,
);

connection.query("SELECT Name FROM country WHERE Continent = 'Europe'", resultHandler);

connection.query("SELECT Name FROM country ORDER BY SurfaceArea DESC", resultHandler);

connection.query("SELECT Name FROM city WHERE CountryCode = 'NLD'", resultHandler);

connection.query("SELECT Population FROM city WHERE Name = 'Rotterdam'", resultHandler);

connection.query("SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10", resultHandler);

connection.query("SELECT * FROM city ORDER BY Population DESC LIMIT 10", resultHandler);

connection.query("SELECT SUM(Population) FROM country", resultHandler);

connection.end();
