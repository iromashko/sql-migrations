const express = require('express');
const pg = require('pg');

const app = express();

const pool = new pg.Pool({
  host: 'localhost',
  port: 5433,
  database: 'socialnetwork',
  user: 'postgres',
  password: '123456',
});

app.use(express.urlencoded({ extended: true }));

app.get('/posts', async (req, res) => {
  const { rows } = await pool.query(`
    select * from posts;
  `);

  res.send(`
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>lng</th>
          <th>lat</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => {
            return `
            <tr>
              <td>${row.id}</td>
              <td>${row.loc.x}</td>
              <td>${row.loc.y}</td>
            </tr>
          `;
          })
          .join('')}
      </tbody>
    </table>

    <form method="POST">
        <h3>Create Post</h3>
        <div>
          <label>Lng</label>
          <input name="lng">
        </div>
        <div>
          <label>Lat</label>
          <input name="lat">
        </div>
        <button type="submit">Create</button>
    </form>
  `);
});

app.post('/posts', async (req, res) => {
  const { lng, lat } = req.body;
  await pool.query(`insert into posts (loc) values ($1);`, [
    `(${lat}, ${lng})`,
  ]);
  res.redirect('/posts');
});

app.listen(3005, () => {
  console.log(`listening on port 3005`);
});
