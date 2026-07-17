// Seed schema + example queries for the Consequence-Free Database.
// Everything lives in memory and evaporates when the tab closes.

export const SEED_SQL = `
CREATE TABLE departments (
  id serial PRIMARY KEY,
  name text NOT NULL,
  budget numeric(12,2) NOT NULL
);

CREATE TABLE employees (
  id serial PRIMARY KEY,
  name text NOT NULL,
  title text NOT NULL,
  department_id int REFERENCES departments(id),
  hire_date date NOT NULL
);

CREATE TABLE salaries (
  id serial PRIMARY KEY,
  employee_id int NOT NULL REFERENCES employees(id),
  amount numeric(10,2) NOT NULL,
  effective_date date NOT NULL
);

INSERT INTO departments (name, budget) VALUES
  ('Engineering', 2500000),
  ('Marketing', 900000),
  ('Sales', 1200000),
  ('Human Resources', 400000),
  ('Data Science', 800000);

INSERT INTO employees (name, title, department_id, hire_date) VALUES
  ('Ava Nolan',        'Staff Engineer',            1, '2018-03-12'),
  ('Bram Osei',        'Senior Engineer',           1, '2019-07-01'),
  ('Cleo Vance',       'Backend Engineer',          1, '2021-01-18'),
  ('Dmitri Sokolov',   'Frontend Engineer',         1, '2020-09-30'),
  ('Elif Kaya',        'DevOps Engineer',           1, '2022-02-14'),
  ('Farid Rahman',     'Intern (Unpaid Ideas Guy)', 1, '2024-06-03'),
  ('Greta Lindqvist',  'Engineering Manager',       1, '2017-11-06'),
  ('Hana Sato',        'QA Engineer',               1, '2021-08-23'),
  ('Ivo Petrov',       'Brand Strategist',          2, '2020-04-20'),
  ('Jules Moreau',     'Content Lead',              2, '2019-10-15'),
  ('Kaia Ngata',       'Social Media Manager',      2, '2022-05-09'),
  ('Liam Doyle',       'Growth Hacker (Allegedly)', 2, '2023-01-02'),
  ('Mina Haddad',      'Account Executive',         3, '2018-06-25'),
  ('Noor Al-Fayed',    'Sales Director',            3, '2016-02-01'),
  ('Otto Weber',       'SDR',                       3, '2023-03-13'),
  ('Priya Menon',      'Account Executive',         3, '2020-12-07'),
  ('Quinn Byrne',      'Solutions Engineer',        3, '2021-04-19'),
  ('Rosa Delgado',     'Enterprise AE',             3, '2017-09-11'),
  ('Sami Virtanen',    'People Ops Lead',           4, '2019-05-27'),
  ('Tara Okafor',      'Recruiter',                 4, '2021-10-04'),
  ('Umar Farouk',      'HR Generalist',             4, '2022-08-16'),
  ('Vera Kovacs',      'Data Scientist',            5, '2020-02-24'),
  ('Wei Zhang',        'ML Engineer',               5, '2021-06-14'),
  ('Ximena Cruz',      'Analytics Engineer',        5, '2022-11-28'),
  ('Yusuf Demir',      'Data Engineer',             5, '2019-12-09'),
  ('Zoe Antoniou',     'Head of Dashboards',        5, '2018-08-06');

-- Two salary revisions per employee, deterministically "random".
INSERT INTO salaries (employee_id, amount, effective_date)
SELECT id, 52000 + (id * 7331) % 88000, date '2023-01-01' FROM employees;

INSERT INTO salaries (employee_id, amount, effective_date)
SELECT id, round((52000 + (id * 7331) % 88000) * 1.06), date '2024-01-01' FROM employees;
`;

export interface ExampleQuery {
  label: string;
  sql: string;
}

export const EXAMPLE_QUERIES: ExampleQuery[] = [
  {
    label: 'Blame the correct department (JOIN)',
    sql: `SELECT e.name, e.title, d.name AS department
FROM employees e
JOIN departments d ON d.id = e.department_id
ORDER BY d.name, e.name;`,
  },
  {
    label: 'Payroll forensics (GROUP BY)',
    sql: `SELECT d.name AS department,
       count(e.id) AS headcount,
       round(avg(s.amount), 2) AS avg_salary,
       max(s.amount) AS someone_is_overpaid
FROM departments d
JOIN employees e ON e.department_id = d.id
JOIN salaries s ON s.employee_id = e.id
WHERE s.effective_date = date '2024-01-01'
GROUP BY d.name
ORDER BY avg_salary DESC;`,
  },
  {
    label: 'Sprinkle an index, feel fast (EXPLAIN)',
    sql: `CREATE INDEX IF NOT EXISTS idx_salaries_employee
  ON salaries (employee_id);

EXPLAIN ANALYZE
SELECT * FROM salaries WHERE employee_id = 7;`,
  },
  {
    label: 'A CTE to flex in interviews (WITH)',
    sql: `WITH latest_salary AS (
  SELECT DISTINCT ON (employee_id) employee_id, amount
  FROM salaries
  ORDER BY employee_id, effective_date DESC
)
SELECT e.name, e.title, ls.amount
FROM employees e
JOIN latest_salary ls ON ls.employee_id = e.id
WHERE ls.amount > 100000
ORDER BY ls.amount DESC;`,
  },
  {
    label: 'Rank your coworkers (window function)',
    sql: `SELECT e.name,
       d.name AS department,
       s.amount,
       rank() OVER (PARTITION BY d.id ORDER BY s.amount DESC) AS dept_rank
FROM employees e
JOIN departments d ON d.id = e.department_id
JOIN salaries s ON s.employee_id = e.id
WHERE s.effective_date = date '2024-01-01'
ORDER BY d.name, dept_rank;`,
  },
  {
    label: 'The resume-ender (DROP TABLE)',
    sql: `-- Go on. Nobody's watching. The Reset button exists for a reason.
DROP TABLE salaries;`,
  },
];

export const DEFAULT_QUERY = EXAMPLE_QUERIES[0].sql;
