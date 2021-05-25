const knex = require("knex");
const consola = require("console");
const env = require("../config/environment");
const knexConfig = require("../../knexfile")[env.nodeEnv];

const getSql = (id) => {
  return `SELECT cv.id, cv.id_auto, cv.name, cv.type, cv.description, cv.created_at, cv.updated_at
            FROM culture_values cv
            WHERE 1=1 ${id ? ` and cv.id = '${id}'` : ""}
            ORDER BY cv.type, cv.name;`;
};

const dbClient = knex(knexConfig);

/**
 * List values ordered by type and name
 * @param {number} skip - Number of users to be skipped
 * @param {number} first - Limit number of users to be returned
 * @returns {Promise<Value[], Error>}
 */
async function list({ id = null } = {}) {
  consola.log("consola", getSql(id));
  const data = await dbClient.raw(getSql(id));
  return data.rows;
}
/**
 * @typedef Value
 */
module.exports = { list };
