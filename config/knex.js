import 'dotenv/config'
import knex from 'knex';

const db = knex({
    client: process.env._CLIENT,
    connection: {
    host: process.env._HOST,
    port: process.env._PORT_DB,
    user: process.env._USER,
    password: process.env._PASSWORD,
    database: process.env._DATABASE,
    },
  });

export default db