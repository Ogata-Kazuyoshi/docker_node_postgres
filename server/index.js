const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

console.log('POSTGES_HOSR : ', process.env.POSTGRES_HOST);

// PostgreSQLの設定
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  //hostはコンテナ名を指定すること。コンテナ名を指定すると自動で内部IPに変換されて、”コンテナIP：5432(14行目のポート指定)”にアクセスに行けるようになる
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  database: process.env.POSTGRES_DB,
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
