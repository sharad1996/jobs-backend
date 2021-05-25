exports.up = async (knex) => {
  return knex.raw(`
  CREATE TABLE jobs_culture_values (
    id_auto SERIAL,
    job_id    uuid REFERENCES jobs (id) ON UPDATE CASCADE ON DELETE CASCADE
  , culture_value_id uuid REFERENCES culture_values (id) ON UPDATE CASCADE
  , CONSTRAINT jobs_culture_values_pkey PRIMARY KEY (job_id, culture_value_id)
  );

  -- updated_at update trigger
  DROP TRIGGER IF EXISTS tr_set_timestamp ON jobs_culture_values;

  CREATE TRIGGER tr_set_timestamp
  BEFORE UPDATE ON jobs_culture_values
  FOR EACH ROW
  EXECUTE PROCEDURE fn_set_timestamp();
  `);
};

exports.down = async (knex) => {
  return knex.raw(`
    DROP TABLE IF EXISTS jobs_culture_values
  `);
};
