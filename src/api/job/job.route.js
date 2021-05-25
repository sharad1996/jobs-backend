const { Router } = require("express");
const { validateMiddleware } = require("../middlewares/validation");

const jobParam = require("./job.param");
const jobCtrl = require("./job.controller");

const router = Router();

router
  .route("/")
  /**
   * @api {get} /api/v1/jobs List Jobs
   * @apiName List Jobs
   * @apiGroup Job
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} jobs List of jobs
   * @apiError {Object} error Error response
   */
  .get(validateMiddleware(jobParam.list), jobCtrl.list);

router
  .route("/:jobId")
  /**
   * @api {get} /api/v1/jobs/:jobId Get Job
   * @apiName List Jobs
   * @apiGroup Job
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} job Details
   * @apiError {Object} error Error response
   */
  .get(validateMiddleware(jobParam.get), jobCtrl.get);

router
  .route("/:jobId/apply")
  /**
   * @api {get} /api/v1/jobs/:jobId Get Job
   * @apiName List Jobs
   * @apiGroup Job
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} job Details
   * @apiError {Object} error Error response
   */
  .post(validateMiddleware(jobParam.post), jobCtrl.apply);

module.exports = router;
