exports.seed = async (knex) => {
  console.log("6th seed - jobs_tags");

  // Get data
  const jobs = await knex("jobs");
  const tags = await knex("tags");

  return knex("jobs_tags").insert([
    {
      job_id: jobs[0].id,
      tag_id: tags[0].id,
    },
    {
      job_id: jobs[0].id,
      tag_id: tags[3].id,
    },
    {
      job_id: jobs[0].id,
      tag_id: tags[2].id,
    },
    {
      job_id: jobs[1].id,
      tag_id: tags[2].id,
    },
    {
      job_id: jobs[1].id,
      tag_id: tags[4].id,
    },
    {
      job_id: jobs[2].id,
      tag_id: tags[3].id,
    },
    {
      job_id: jobs[4].id,
      tag_id: tags[1].id,
    },
    {
      job_id: jobs[4].id,
      tag_id: tags[4].id,
    },
  ]);
};
