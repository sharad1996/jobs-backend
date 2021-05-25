exports.up = async (knex) => {
  return knex.raw(`
    DROP TABLE IF EXISTS tags;
    CREATE TABLE IF NOT EXISTS tags
    (
      id uuid UNIQUE DEFAULT uuid_generate_v4 ()  PRIMARY KEY,
      id_auto SERIAL,
      name VARCHAR(250) NOT NULL,
      description TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX "idx_tags_id_auto" ON tags USING btree (id_auto);


    -- updated_at update trigger

    DROP TRIGGER IF EXISTS tr_set_timestamp ON tags;

    CREATE TRIGGER tr_set_timestamp
    BEFORE UPDATE ON tags
    FOR EACH ROW
    EXECUTE PROCEDURE fn_set_timestamp();
  `);
};

exports.down = async (knex) => {
  return knex.raw(`
    DROP TABLE IF EXISTS tags
  `);
};
