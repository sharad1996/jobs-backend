exports.up = async (knex) => {
  return knex.raw(`
    DROP TABLE IF EXISTS companies;
    CREATE TABLE IF NOT EXISTS companies
    (
      id uuid UNIQUE DEFAULT uuid_generate_v4 ()  PRIMARY KEY,
      id_auto SERIAL,
      name VARCHAR(250) NOT NULL,
      url TEXT NOT NULL,
      logo_url TEXT,
      linkedin TEXT,
      twitter TEXT,
      facebook TEXT,
      instagram TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX "idx_companies_id_auto" ON companies USING btree (id_auto);


    -- updated_at update trigger

    DROP TRIGGER IF EXISTS tr_set_timestamp ON companies;

    CREATE TRIGGER tr_set_timestamp
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE PROCEDURE fn_set_timestamp();
  `);
};

exports.down = async (knex) => {
  return knex.raw(`
    DROP TABLE  companies;
  `);
};
