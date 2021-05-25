exports.up = async (knex) => {
  return knex.raw(`
  DROP TABLE IF EXISTS subscribers;
  CREATE TABLE IF NOT EXISTS subscribers
  (
    id uuid UNIQUE DEFAULT uuid_generate_v4 ()  PRIMARY KEY,
    id_auto SERIAL,
    email VARCHAR(250) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX "idx_subscribers_id_auto" ON subscribers USING btree (id_auto);
  CREATE UNIQUE INDEX "idx_subscribers_email_auto" ON subscribers USING btree (email);


  -- updated_at update trigger

  DROP TRIGGER IF EXISTS tr_set_timestamp ON subscribers;

  CREATE TRIGGER tr_set_timestamp
  BEFORE UPDATE ON subscribers
  FOR EACH ROW
  EXECUTE PROCEDURE fn_set_timestamp();
  `);
};

exports.down = async (knex) => {
  return knex.raw(`
    DROP TABLE IF EXISTS subscribers
  `);
};
