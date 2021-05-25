const { Router } = require("express");
const { validateMiddleware } = require("../middlewares/validation");

const subscriberParam = require("./subscriber.param");
const subscriberCtrl = require("./subscriber.controller");

const router = Router();

router
  .route("/")
  /**
   * @api {post} /api/v1/subscribers Post Subscriber
   * @apiName Post Subscriber
   * @apiGroup Subscriber
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} subscriber Details
   * @apiError {Object} error Error response
   */
  .post(validateMiddleware(subscriberParam.post), subscriberCtrl.post);

module.exports = router;
