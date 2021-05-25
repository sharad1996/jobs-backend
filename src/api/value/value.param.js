const Joi = require("@hapi/joi");

module.exports = {
  /**
   * @apiName List Values
   * @apiGroup Value
   */
  list: {
    query: Joi.object({
      skip: Joi.number().optional(),
      first: Joi.number().optional(),
    }),
  },
  /**
   * @apiName Get Value
   * @apiGroup Value
   */
  get: {
    params: Joi.object({
      valueId: Joi.string().required(),
    }),
  },
};
