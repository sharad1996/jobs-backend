const knex = require("knex");
const env = require("../config/environment");
const knexConfig = require("../../knexfile")[env.nodeEnv];

const getSql = (id) => {
  return `select
        array_to_json(array_agg(
          row_to_json(job)
       ))
  from (
           select jobs.id,
                  jobs.name,
                  jobs.description,
                  jobs.added_at,
                  (
                      select row_to_json(d)
                      from (
                               select id, name, url, logo_url
                               from companies
                               where id = jobs.company_id
                           ) d
                  ) as company,
                  (
                      select array_to_json(array_agg(row_to_json(d)))
                      from (
                               select jobs_tags.tag_id as id, tags.name, tags.description
                               from jobs_tags
                                        inner join tags on jobs_tags.tag_id = tags.id
                               where jobs_tags.job_id = jobs.id
                           ) d
                  ) as tags,
                  (
                      select array_to_json(array_agg(row_to_json(d)))
                      from (
                               select jobs_culture_values.culture_value_id as id,
                                      culture_values.name,
                                      culture_values.description
                               from jobs_culture_values
                                        inner join culture_values
                                                   on jobs_culture_values.culture_value_id = culture_values.id
                               where jobs_culture_values.job_id = jobs.id
                           ) d
                  ) as culture_values
           from jobs
           where 1=1 ${id ? ` and jobs.id = '${id}'` : ""}
           order by jobs.added_at desc) job;`;
};

const getUpsertSql = (jobId, applicant) => {
  return `UPDATE jobs
  SET applicant
  WHERE id = ${jobId}`;
};

const dbClient = knex(knexConfig);

/**
 * List jobs in decending order of 'added_at' timestamp
 * @param {number} skip - Number of users to be skipped
 * @param {number} first - Limit number of users to be returned
 * @returns {Promise<Job[], Error>}
 */
async function list({ id = null } = {}) {
  const data = await dbClient.raw(getSql(id));
  return data.rows[0].array_to_json;
}
/**
 * @typedef Job
 */

async function update({ jobId = null, applicantId = null } = {}) {
  await dbClient.raw(getUpsertSql(email));
  const data = await dbClient.raw(getSelectSql(email));
  return data.rows[0];
}


module.exports = { list, update };
