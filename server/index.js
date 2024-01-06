const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// PostgreSQLの設定
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'postgres_db',
  password: 'password',
  port: 5432,
});

// ルーティングの設定
app.get('/', async (req, res) => {
  const { rows } = await pool.query('select * from users');
  res.send(rows);
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
