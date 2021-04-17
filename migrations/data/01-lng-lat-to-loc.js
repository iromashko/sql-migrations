const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  port: 5433,
  database: 'socialnetwork',
  user: 'postgres',
  password: '123456',
});

pool
  .query(
    `
  update posts
  set loc = point(lng, lat)
  where loc is null
`
  )
  .then(() => {
    console.log(`update complete`);
    pool.end();
  })
  .catch((error) => console.error(error.message));
