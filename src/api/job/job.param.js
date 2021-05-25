const Joi = require("@hapi/joi");

module.exports = {
  /**
   * @apiName List Jobs
   * @apiGroup Job
   */
  list: {
    query: Joi.object({
      skip: Joi.number().optional(),
      first: Joi.number().optional(),
    }),
  },
  /**
   * @apiName Get Job
   * @apiGroup Job
   */
  get: {
    params: Joi.object({
      jobId: Joi.string().required(),
    }),
  },
  /**
   * @apiName Apply Job
   * @apiGroup Job
   */
  post: {
    params: Joi.object({
      jobId: Joi.string().required(),
    }),
  },
};
