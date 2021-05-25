exports.seed = async (knex) => {
  console.log("5th seed - jobs_caluture_values");

  // Get data
  const jobs = await knex("jobs");
  const culture_values = await knex("culture_values");

  // console.log("found", jobs.length, "jobs");
  return knex("jobs_culture_values").insert([
    {
      job_id: jobs[0].id,
      culture_value_id: culture_values[0].id,
    },
    {
      job_id: jobs[0].id,
      culture_value_id: culture_values[3].id,
    },
    {
      job_id: jobs[0].id,
      culture_value_id: culture_values[2].id,
    },
    {
      job_id: jobs[1].id,
      culture_value_id: culture_values[2].id,
    },
    {
      job_id: jobs[1].id,
      culture_value_id: culture_values[4].id,
    },
    {
      job_id: jobs[2].id,
      culture_value_id: culture_values[3].id,
    },
    {
      job_id: jobs[4].id,
      culture_value_id: culture_values[1].id,
    },
    {
      job_id: jobs[4].id,
      culture_value_id: culture_values[4].id,
    },
  ]);
};
