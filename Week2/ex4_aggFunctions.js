import { createConnection } from 'mysql';

const connection = createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'bookdb'
})

const execQuery = (query) => {
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
}

connection.connect();

const PRINT_ALL_RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS = `
  SELECT research_Papers.paper_title, COUNT(auth_res_papers.author_no) 
  AS number_of_authors
  FROM  research_Papers
  JOIN auth_res_papers ON research_Papers.paper_id = auth_res_papers.paper_id 
  GROUP BY research_Papers.paper_title;
`;

const PRINT_RESEARCH_PAPERS_PUBLISHED_BY_FEMALES = `
  SELECT COUNT(auth_res_papers.paper_id) FROM authors
  INNER JOIN auth_res_papers
  ON auth_res_papers.author_no = author.author_no 
  GROUP BY gender
  HAVING gender = 'f';
`;

const PRINT_AVE_OF_H_INDEX_AUTHORS = `
  SELECT university AS University, AVG(h_index) AS Avarege of h_index
  FROM authors
  GROUP BY university;
`;

const PRINT_SUM_RES_PAPERS_AUTHORS_PER_UNIVERSITY = `
  SELECT university, COUNT(auth_res_papers.paper_id) AS Sum_of_Research_Papers
  FROM authors 
  INNER JOIN auth_res_papers
  ON auth_res_papers.author_no = authors.author_no
  GROUP BY university;
`;

const MIN_MAX_H_INDEX_OF_AUTHORS_PER_UNIVERSITY = `
  SELECT university, MIN(h_index) AS Min h_index, MAX(h_index) AS Max h_index
  FROM authors
  GROUP BY university;
`;

execQuery(PRINT_ALL_RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS);
execQuery(PRINT_RESEARCH_PAPERS_PUBLISHED_BY_FEMALES);
execQuery(PRINT_AVE_OF_H_INDEX_AUTHORS);
execQuery(PRINT_SUM_RES_PAPERS_AUTHORS_PER_UNIVERSITY);
execQuery(MIN_MAX_H_INDEX_OF_AUTHORS_PER_UNIVERSITY);

connection.end();