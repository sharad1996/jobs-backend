const { Router } = require("express");
const { validateMiddleware } = require("../middlewares/validation");

const valueParam = require("./value.param");
const valueCtrl = require("./value.controller");

const router = Router();

router
  .route("/")
  /**
   * @api {get} /api/v1/values/ List Jobs
   * @apiName List Values
   * @apiGroup Value
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} Values List of values
   * @apiError {Object} error Error response
   */
  .get(validateMiddleware(valueParam.list), valueCtrl.list);

router
  .route("/:valueId")
  /**
   * @api {get} /api/v1/values/:valueId Get Value
   * @apiName List Values
   * @apiGroup Value
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} Value Details
   * @apiError {Object} error Error response
   */
  .get(validateMiddleware(valueParam.get), valueCtrl.get);

module.exports = router;
