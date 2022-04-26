import { Pool } from 'pg';

export default new Pool({
  connectionString: process.env.PG_LOCAL_URL,
  ssl: { rejectUnauthorized: false },
});
