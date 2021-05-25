exports.up = async (knex) => {
  return knex.raw(`
  DROP TABLE IF EXISTS culture_values;
  CREATE TABLE IF NOT EXISTS culture_values
  (
    id uuid UNIQUE DEFAULT uuid_generate_v4 ()  PRIMARY KEY,
    id_auto SERIAL,
    name VARCHAR(250) NOT NULL,
    type VARCHAR(250) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX "idx_culture_values_id_auto" ON culture_values USING btree (id_auto);
  CREATE INDEX "idx_culture_values_name_auto" ON culture_values USING btree (name);
  CREATE INDEX "idx_culture_values_type_auto" ON culture_values USING btree (type);


  -- updated_at update trigger

  DROP TRIGGER IF EXISTS tr_set_timestamp ON culture_values;

  CREATE TRIGGER tr_set_timestamp
  BEFORE UPDATE ON culture_values
  FOR EACH ROW
  EXECUTE PROCEDURE fn_set_timestamp();
  `);
};

exports.down = async (knex) => {
  return knex.raw(`
    DROP TABLE IF EXISTS culture_values
  `);
};
