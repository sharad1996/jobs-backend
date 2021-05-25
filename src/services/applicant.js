const knex = require("knex");
const env = require("../config/environment");
const knexConfig = require("../../knexfile")[env.nodeEnv];

const getUpsertSql = (email, name, number, jobId) => {
  return `INSERT INTO applicants (email, name, number, jobId)
  VALUES
    (
      '${email}',
      '${name}',
      '${number}',
      '${jobId}',
    )
  ON CONFLICT (email)
  DO
      UPDATE
      SET email = EXCLUDED.email`;
};

const getSelectSql = (email) => `SELECT id, email FROM subscribers WHERE email = '${email}'`;

const dbClient = knex(knexConfig);

/**
 * @param {number} email - Applicants's email
 */
async function update({ email = null, name = null, number = null, jobId = null } = {}) {
  await dbClient.raw(getUpsertSql(email, name, number, jobId));
  const data = await dbClient.raw(getSelectSql(email));
  return data.rows[0];
}

/**
 * @typedef Applicant
 */
module.exports = { update };
