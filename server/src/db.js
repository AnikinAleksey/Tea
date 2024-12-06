const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'teas',
    password: '0103',
    port: 5432,
});

module.exports = pool;