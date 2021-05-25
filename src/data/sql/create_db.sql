-- -- DB CREATION RUN MANUALLY
-- DROP DATABASE IF EXISTS bp_jobs_board;
-- CREATE DATABASE bp_jobs_board;

-- DO
-- $do$
-- BEGIN
--     IF NOT EXISTS (
--       SELECT                       -- SELECT list can stay empty for this
--       FROM   pg_catalog.pg_roles
--       WHERE  rolname = 'jobs_board_app') THEN

--       CREATE USER jobs_board_app WITH ENCRYPTED PASSWORD 'password';
--     END IF;
-- END
-- $do$;

-- CREATE SCHEMA IF NOT EXISTS jobs_board;
-- GRANT ALL PRIVILEGES ON SCHEMA jobs_board TO jobs_board_app;

-- uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- now login as 'jobs_board_app'

-- updated_at timestamp
CREATE OR REPLACE FUNCTION fn_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
