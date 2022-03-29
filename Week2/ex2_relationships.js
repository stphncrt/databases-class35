import util from 'util';
import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'bookdb',
})

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async() => {
    const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_Papers(
      paper_id INT PRIMARY KEY, 
      paper_title VARCHAR(50),
      conference TEXT,
      publish_date DATE
    );`;

    const CREATE_AUTHORS_RESEARCH_PAPERS_TABLE = `
      CREATE TABLE IF NOT EXISTS auth_res_papers(
        id INT PRIMARY KEY,
        author_no INT FOREIGN KEY REFERENCES authors(author_no),
        paper_id INT FOREIGN KEY REFERENCES research_Papers(paper_id)
      );`;

    const INSERT_AUTHORS = `
        INSERT INTO authors VALUES
        (001,'Hofstede','University of Amsterdam', '1980-01-01',100,'m',002),
        (002,'Anna','University of Istanbul', '1985-01-01',140,'f',003),
        (003,'Jack','MIT', '1990-01-01',103,'m',004),
        (004,'John','University of Amsterdam', '1983-01-11',107,'m',005),
        (005,'Jackline','University of Amsterdam', '1992-03-01',50,'f',002),
        (006,'Caroline','University of Madrid', '1998-05-01',155,'f',007),
        (007,'Mahmut','University of Urfa', '1987-04-11',13,'m',006),
        (008,'Ilber','Mektebi Sultani', '1999-02-21',1040,'m',009),
        (009,'Celal','Newyork University', '2000-01-01',80,'m',008),
        (010,'Anderson','Stockholm University', '2005-01-01',145,'m',011),
        (011,'Mary','Newyork University', '2000-01-01',124,'f',012),
        (012,'Hannah','Delft University', '2012-01-01',77,'f',013),
        (013,'Dilek','Maastricht University', '2013-01-01',20,'f',013),
        (014,'Diva','Nova University', '2016-05-01',100,'f',015),
        (015,'Beatriz','University of Lisbon', '2018-01-01',178,'f',014)       
    `;

    const INSERT_RESEARCH_PAPERS = `
        INSERT INTO research_Papers VALUES
        (101,'Html', 'Html Conference', '2015-01-01'),
        (102,'Css', 'Css Conference', '2015-01-02'),
        (103,'Code', 'Code Conference', '2015-01-03'),
        (104,'Text', 'Text Conference', '2015-01-04'),
        (105,'Image', 'Image Conference', '2015-01-05'),
        (106,'JS', 'JS Conference', '2015-01-06'),
        (107,'React', 'React Conference', '2015-01-07'),
        (108,'Vue', 'Vue Conference', '2015-01-08'),
        (109,'Sass', 'Sass Conference', '2015-01-09'),
        (110, 'Python', 'Python Conference', '2015-01-10'),
        (111,'Java', 'Java Conference', '2015-01-11'),
        (112,'C++','C++ Conference','2015-01-12'),
        (113,'R','R Conference','2015-01-13'),
        (114,'Kotlin', 'Kotlin Conference', '2015-01-14'),
        (115,'React_native', 'React_native Conference', '2015-01-15'),
        (116, 'JavaScript', 'JavaScript Conference', '2015-01-16'),
        (117,'Github', 'Github Conference', '2015-01-17'),
        (118,'Git', 'Git Conference', '2015-01-18'),
        (119,'VSCode', 'VSCode Conference', '2015-01-19'),
        (120,'Material', 'Material Conference', '2015-01-20'),
        (121,'Ant_design', 'Ant_design Conference', '2015-01-21'),
        (122,'Bootstrap','Bootstrap Conference', '2015-01-22),
        (123,'Webkit','Webkit Conference', '2015-01-23'),
        (124,'Php','Php Conference', '2015-01-24'),
        (125,'UX', 'UX Conference', '2015-01-25'),
        (126,'UI', 'UI Conference', '2015-01-26'),
        (127,'Jira', 'Jira Conference', '2015-01-27'),
        (128,'Waterfall','Waterfall Conference', '2015-01-28'),
        (129,'Kanban','Kanban Conference', '2015-01-29'),
        (130,'Scrum','Scrum Conference', '2015-01-30')
    `;
    const INSERT_AUTH_RES_PAPERS = `
        INSERT INTO auth_res_papers VALUES EXISTS
        (1, 001, 101),
        (2, 001, 102),
        (3, 001, 103),
        (4, 002, 104),
        (5, 002, 105),
        (6, 003, 106),
        (7, 003, 107),
        (8, 004, 108),
        (9, 005, 109),
        (10, 006, 110),
        (11, 007, 111),
        (12, 007, 112),
        (13, 008, 113),
        (14, 008, 114),
        (15, 009, 115),
        (16, 009, 116),
        (17, 010, 117),
        (18, 010, 118),
        (19, 011, 119),
        (20, 011, 120),
        (21, 012, 121),
        (22, 013, 122),
        (23, 014, 123),
        (24, 014, 124),
        (25, 015, 125),
        (26, 015, 126),
        (27, 013, 127),
        (28, 014, 128),
        (29, 014, 129),
        (30, 015, 130)
    `;
    connection.connect();

    try {
        await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
        await execQuery(CREATE_AUTHORS_RESEARCH_PAPERS_TABLE);
        await execQuery(INSERT_AUTHORS);
        await execQuery(INSERT_RESEARCH_PAPERS);
        await execQuery(INSERT_AUTH_RES_PAPERS);

    } catch (err) {
        console.log(err);
        connection.end();
    }
    connection.end();
};

seedDatabase();