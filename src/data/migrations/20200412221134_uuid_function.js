exports.up = async (knex) => {
  return knex.raw(`
  -- uuid
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  -- updated_at timestamp
  CREATE OR REPLACE FUNCTION fn_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  `);
};

exports.down = async (knex) => {
  return knex.raw(`
    DROP FUNCTION IF EXISTS fn_set_timestamp;
    DROP EXTENSION IF EXISTS "uuid-ossp";
  `);
};
