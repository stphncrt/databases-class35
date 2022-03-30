import { createConnection } from 'mysql';

const connection = createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'bookdb',
});

connection.connect();

const execQuery = (query) => {
    connection.query(query, (err, result) => {
        if (err) throw err;
        else console.table(result);
    });
};

const PRINT_ALL_AUTHORS_AND_MENTORS = `
  SELECT author_name, mentor FROM authors;
`;

const PRINT_ALL_AUTHORS_COLUMNS_AND_PAPER_TITLE = `
  SELECT authors.*, research_Papers.paper_title 
  FROM authors
  LEFT JOIN auth_res_papers 
  ON auth_res_papers.author_no = authors.author_no
  LEFT JOIN research_Papers
  ON auth_res_papers.paper_id = research_Papers.paper_id;
`;


execQuery(PRINT_ALL_AUTHORS_AND_MENTORS);
execQuery(PRINT_ALL_AUTHORS_COLUMNS_AND_PAPER_TITLE);

connection.end();