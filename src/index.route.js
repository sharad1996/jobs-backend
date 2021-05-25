const express = require("express");
const jobRoutes = require("./api/job/job.route");
const valuesRoutes = require("./api/value/value.route");
const subscriberRoutes = require("./api/subscriber/subscriber.route");
// const authRoutes = require("./api/auth/auth.route");

const router = express.Router();

/**
 * @api {get} /api Health Check
 * @apiName Health Check
 * @apiGroup API
 * @apiVersion 1.0.0
 *
 * @apiParam none
 *
 * @apiSuccess {String} OK Success Response
 * @apiError {Object} error Error Response
 */
router.get("/", (req, res) => {
  req.log.info("logger");
  res.send("OK");
});

/**
 * @apiDescription Jobs routes at /jobs
 * @apiGroup Job
 */
router.use("/jobs", jobRoutes);

/**
 * @apiDescription Values routes at /values
 * @apiGroup Value
 */
router.use("/values", valuesRoutes);

/**
 * @apiDescription Subscribers routes at /subscribers
 * @apiGroup Subscriber
 */
router.use("/subscribers", subscriberRoutes);

module.exports = router;
