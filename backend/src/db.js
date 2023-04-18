const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const bcrypt = require('bcrypt');

getSubCategories = async (category) => {
  const select = `SELECT jsonb_array_elements(category->'sub')
    FROM category WHERE categoryName ILIKE $1`;
  const query = {
    text: select,
    values: [category],
  };
  const {rows} = await pool.query(query);
  const sub = [];
  for (row of rows) {
    sub.push(row.jsonb_array_elements);
  }
  return sub;
};

exports.selectTodaysPicks = async (category) => {
  let select = `SELECT category,listing FROM listing`;
  let subs = [];
  if (category) {
    select += ` WHERE (category ILIKE $1)`;
    subs = await getSubCategories(category);
    if (!(subs.length == 0)) {
      for (let i = 0; i < subs.length; i++) {
        select += ` OR (category ILIKE $${i+2})`;
      }
    }
  }
  subs = [...subs, category];
  const query = {
    text: select,
    values: category ? subs : [],
  };
  const {rows} = await pool.query(query);
  return rows;
};

exports.selectCategory = async (name) => {
  const select = 'SELECT * FROM category WHERE categoryName ILIKE $1';
  const query = {
    text: select,
    values: [name],
  };
  const {rows} = await pool.query(query);
  return rows.length == 1 ? rows[0].category : undefined;
};

exports.insertUser = async (fn, ln, email, phone, password) => {
  password = await bcrypt.hash(password, 10);
  let insert = 'INSERT INTO users(id, fn, ln, email, phone, password) ';
  insert += 'VALUES (gen_random_uuid(), ';
  insert += `'${fn}', '${ln}', '${email}', '${phone}', '${password}')`;
  const query = {
    text: insert,
  };
  await pool.query(query);
};
