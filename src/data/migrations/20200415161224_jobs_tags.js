exports.up = async (knex) => {
  return knex.raw(`
  CREATE TABLE jobs_tags (
    id_auto SERIAL,
    job_id    uuid REFERENCES jobs (id) ON UPDATE CASCADE ON DELETE CASCADE
  , tag_id uuid REFERENCES tags (id) ON UPDATE CASCADE
  , CONSTRAINT jobs_tags_pkey PRIMARY KEY (job_id, tag_id)
  );

  -- updated_at update trigger
  DROP TRIGGER IF EXISTS tr_set_timestamp ON jobs_tags;

  CREATE TRIGGER tr_set_timestamp
  BEFORE UPDATE ON jobs_tags
  FOR EACH ROW
  EXECUTE PROCEDURE fn_set_timestamp();
  `);
};

exports.down = async (knex) => {
  return knex.raw(`
    DROP TABLE IF EXISTS jobs_tags
  `);
};
