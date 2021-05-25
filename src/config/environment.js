const Joi = require("@hapi/joi");
const fs = require("fs");
const path = require("path");

// console.log("uri PORT", process.env.DB_PORT);
let dotenv = {};

try {
  if (fs.existsSync(path.resolve(process.cwd(), ".env"))) {
    dotenv = require("dotenv").config(); // eslint-disable-line global-require
    console.log(".env file loaded"); // eslint-disable-line no-console
  } else {
    console.log(".env file not found, will use env vars if any"); // eslint-disable-line no-console
  }
} catch (err) {
  console.error(err); // eslint-disable-line no-console
}

/**
 * Error on unsuccessful loading of .env
 */
if (dotenv.error) {
  throw new Error(`Problem loading .env file: ${dotenv.error.message}`);
}

/**
 * Validations schemas for .env
 */
const schema = Joi.object({
  APP_NAME: Joi.string().default("bp-api"),
  NODE_ENV: Joi.string()
    .lowercase()
    .trim()
    .allow("development", "production", "test", "staging")
    .default("development"),
  PORT: Joi.number().default(8080),
  JWT_SECRET: Joi.string().required().description("JWT Secret required to sign"),
})
  .unknown()
  .required();

const dbDebugSchema = Joi.boolean().when("NODE_ENV", {
  is: Joi.string().equal("development"),
  then: Joi.boolean().default(true),
  otherwise: Joi.boolean().default(false),
});

const dbSchema = Joi.alternatives().try(
  Joi.object()
    .keys({
      DATABASE_URL: Joi.string().required().description("Complete DB connection string"),
      DB_DEBUG: dbDebugSchema,
    })
    .unknown()
    .required(),
  Joi.object()
    .keys({
      DB_NAME: Joi.string().required().description("DB name"),
      DB_HOST: Joi.string().required().description("DB host url"),
      DB_PORT: Joi.string().required().description("DB port"),
      DB_DEBUG: dbDebugSchema,
      DB_USERNAME: Joi.string().optional().allow("", null).description("DB username"),
      DB_PASSWORD: Joi.string().optional().allow("", null).description("DB password"),
    })
    .unknown()
    .required()
);

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env validation error: ${error.message}`);
}

const { error: dbError, value: dbValue } = dbSchema.validate(process.env);
if (dbError) {
  throw new Error(`.env validation DB error: ${dbError.message}`);
}
/**
 * Const to contain validated env vers
 */
const env = {
  appName: value.APP_NAME,
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
  db: {
    host: dbValue.DB_HOST,
    port: dbValue.DB_PORT,
    dbName: dbValue.DB_NAME,
    username: dbValue.DB_USERNAME,
    password: dbValue.DB_PASSWORD,
    debug: dbValue.DB_DEBUG,
  },
  jwtSecret: value.JWT_SECRET,
};

console.log(env); // eslint-disable-line no-console

module.exports = env;
