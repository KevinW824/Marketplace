const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secrets = require('./secrets.json');

exports.authenticate = async (req, res) => {
  const {email, password} = req.body;
  const select = `SELECT * FROM users WHERE users.email = '${email}';`;
  const query = {
    text: select,
  };
  let user = undefined;
  const {rows} = await pool.query(query);
  for (const row of rows) {
    if (bcrypt.compareSync(password, row.password)) {
      user = row;
    }
  }
  if (user) {
    const accessToken = jwt.sign(
      {email: user.email},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    console.log(accessToken);
    res.status(200).json({email: user.email, accessToken: accessToken});
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

// exports.check = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, secrets.accessToken, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

