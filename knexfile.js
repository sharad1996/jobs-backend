const env = require("./src/config/environment");

const connections = {
  development: {
    client: "pg",
    connection: {
      host: env.db.host,
      user: env.db.username,
      password: env.db.password,
      port: env.db.port,
      charset: "utf8",
      database: env.db.dbName,
    },
    pool: {
      min: 1,
      max: 5,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },
    searchPath: ["knex", "public"],
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: { directory: "./src/data/seeds" },
  },

  test: {
    client: "pg",
    connection: {
      host: env.db.host,
      user: env.db.username,
      password: env.db.password,
      port: env.db.port,
      charset: "utf8",
      database: env.db.dbName,
    },
    searchPath: ["knex", "public"],
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: { directory: "./src/data/seeds" },
  },

  staging: {
    client: "pg",
    connection: env.db.dbUrl,
    searchPath: ["knex", "public"],
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: { directory: "./src/data/seeds" },
  },

  production: {
    client: "pg",
    connection: {
      host: env.db.host,
      user: env.db.username,
      password: env.db.password,
      port: env.db.port,
      charset: "utf8",
      database: env.db.dbName,
      // ssl: {
      //   sslrootcert: "/path/to/root.crt",
      //   sslcert: "/path/to/postgresql.crt",
      //   sslkey: "/path/to/postgresql.key", //<-- Make sure this is chmod 600
      //   sslmode: "require",
      // },
    },
    pool: {
      min: 1,
      max: 10,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },
    searchPath: ["knex", "public"],
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: { directory: "./src/data/seeds" },
  },
};

module.exports = connections;
