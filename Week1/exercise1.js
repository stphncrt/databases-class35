import mysql from "mysql";
const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "meetup",

	// port : xxxx // Uncomment this line and replace xxxx with the selected port number if you are not using default 3306. I also suggest to download MySQL version 5.7 because recent versions has authentication problems
});

//connect
connection.connect((err) => {
	if (err) throw err;
	console.log("MySQL connection established...");
});
const resultHandler = (err, result) => {
	if (err) throw err;
	console.log(result);
};
//create database
connection.query("CREATE DATABASE IF NOT EXISTS meetup", resultHandler);

connection.query("USE meetup", resultHandler);

connection.query(
	"CREATE TABLE IF NOT EXISTS Invitee(invitee_no int AUTO_INCREMENT, invitee_name VARCHAR(255), invited_by VARCHAR(255), PRIMARY KEY(invitee_no))",
	resultHandler,
);

connection.query(
	"CREATE TABLE IF NOT EXISTS Room(room_no int, room_name VARCHAR(255), floor_number int)",
	resultHandler,
);
connection.query(
	"CREATE TABLE IF NOT EXISTS Meeting(meeting_no int, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no int)",
	resultHandler,
);

connection.query(
	`INSERT INTO Invitee(invitee_no, invitee_name, invited_by)
	VALUES 
	(1, "Stephen", 'John'),
	(2, 'Mc Carty', 'John'),
	(3, 'John', 'John'),
	(4, 'Emily', 'John'),
	(5, 'Samba', 'John')`,
	resultHandler,
);

connection.query(
	`INSERT INTO room(room_no, room_name, floor_number) VALUES
	(000,'Red',0),
	(101,'Green',1),
	(102,'Blue',1),
	(204,'White',2),
	(305,'Brown',3)`,
	resultHandler,
);

connection.query(
	`INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
    VALUES 
      (1, 'Daily Standup', '2022-04-12 09:30:00', '2022-04-12 15:30:00', 101),
      (2, 'Weekly', '2022-04-15 09:00:00', '2022-04-13 16:30:00', 102),
      (3, 'Sprint retrospective', '2022-05-12 11:45:00', '2022-05-12 14:00:00', 204),
      (4, 'Scrum', '2022-06-01 09:00:00', '2022-06-01 17:00:00', 305),
      (5, 'Kanban', '2022-07-10 09:30:00', '2022-07-10 15:45:00', 000)`,
	resultHandler,
);

connection.end();
