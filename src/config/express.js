const compression = require("compression");
const consola = require("consola");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const methodOverride = require("method-override");
const httpStatus = require("http-status");
const pino = require("pino-http");

const env = require("./environment");
const routes = require("../index.route");
const APIError = require("../api/libs/APIError");

const app = express();

/**
 * Set application port to listen to
 */
app.set("port", env.port);

/**
 * Middleware to compress respose bodies
 */
app.use(compression());

/**
 * Middleware to parese req.body data
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Log request details to console
 */
// if (env.nodeEnv !== "test") {
app.use(pino());
// }

/**
 * Enables HTTP verbs such as PUT or DELETE in places
 * where the client doesn't support it
 */
app.use(methodOverride());

/**
 * Enables cross-origin resource sharing
 */
app.use(cors());

/**
 * Use helmet to secure Express headers
 */
app.use(helmet());

/**
 * Mounts api routes at /api
 */
app.use("/api/v1", routes);

/**
 * If error is not an instanceOf APIError, convert it.
 */
app.use((err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  const err = new APIError("API not found!", httpStatus.NOT_FOUND, false);
  return next(err);
});

/**
 * error handler, send stacktrace only during development
 */
// disable this eslint rule because 'next' is needed: if not there function won't catch the errors
/* eslint-disable  no-unused-vars */
app.use((err, req, res, next) => {
  // log the error to the console in case of dev env
  if (["development", "test"].includes(env.nodeEnv)) consola.error(err);

  // response
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: env.nodeEnv === "development" ? err.stack : {},
  });
});
/* eslint-enable  no-unused-vars */

module.exports = app;
