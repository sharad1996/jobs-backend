const Joi = require("@hapi/joi");

module.exports = {
  /**
   * @apiName Post Subscriber
   * @apiGroup Subscriber
   */
  post: {
    body: Joi.object({
      email: Joi.string().email().required(),
    }),
  },
};
