const knex = require("knex");
const env = require("../config/environment");
const knexConfig = require("../../knexfile")[env.nodeEnv];

const getUpsertSql = (email) => {
  return `INSERT INTO subscribers (email)
  VALUES
    (
      '${email}'
    )
  ON CONFLICT (email)
  DO
      UPDATE
      SET email = EXCLUDED.email`;
};
const getSelectSql = (email) => `SELECT id, email FROM subscribers WHERE email = '${email}'`;

const dbClient = knex(knexConfig);

/**
 * List jobs in decending order of 'added_at' timestamp
 * @param {number} email - Subscriber's email
 * @returns {Promise<Job[], Error>}
 */
async function post({ email = null } = {}) {
  await dbClient.raw(getUpsertSql(email));
  const data = await dbClient.raw(getSelectSql(email));
  return data.rows[0];
}

/**
 * @typedef Job
 */
module.exports = { post };
