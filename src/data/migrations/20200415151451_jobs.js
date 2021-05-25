exports.up = async (knex) => {
  return knex.raw(`
  DROP TABLE IF EXISTS jobs;
  CREATE TABLE IF NOT EXISTS jobs
  (
    id uuid UNIQUE DEFAULT uuid_generate_v4 ()  PRIMARY KEY,
    id_auto SERIAL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    name VARCHAR(250) NOT NULL,
    company_id uuid REFERENCES companies(id)  ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX "idx_jobs_id_auto" ON jobs USING btree (id_auto);
  CREATE INDEX "idx_jobs_is_active_auto" ON jobs USING btree (is_active);
  CREATE INDEX "idx_jobs_name_auto" ON jobs USING btree (name);
  CREATE INDEX "idx_jobs_company_id_auto" ON jobs USING btree (company_id);
  CREATE INDEX "idx_jobs_added_at_auto" ON jobs USING btree (added_at);

  -- updated_at update trigger
  DROP TRIGGER IF EXISTS tr_set_timestamp ON jobs;

  CREATE TRIGGER tr_set_timestamp
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE PROCEDURE fn_set_timestamp();
  `);
};

exports.down = async (knex) => {
  return knex.raw(`
    DROP TABLE IF EXISTS jobs
  `);
};
