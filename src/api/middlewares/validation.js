const { isEmpty } = require("lodash");
const httpStatus = require("http-status");
const APIError = require("../libs/APIError");

const defaultValidation = {};

function validateMiddleware(routeValidation) {
  return (req, res, next) => {
    const validation = { ...defaultValidation, ...routeValidation };

    const validationProps = Object.keys(validation);
    const errors = [];
    validationProps.forEach((validationProp) => {
      // reqProp (params, query, body, headers) -  check if a validation object exists
      const schema = validation[validationProp];
      const requestItem = req[validationProp];

      // console.log("validationProp", validationProp);
      // console.log("schema", !isEmpty(schema));
      // console.log("requestItem", !isEmpty(requestItem), requestItem);

      if (!isEmpty(schema)) {
        const { value, error } = schema.validate(requestItem, {
          abortEarly: false, // find all errors
          allowUnknown: false, // allow only listed props
          context: {
            req,
          },
        });
        if (error) {
          errors.push(error);
        } else {
          req[validationProp] = value;
        }
      }
    });

    if (!isEmpty(errors)) {
      return next(
        new APIError(
          `${errors.join("\n")}`,
          httpStatus.UNPROCESSABLE_ENTITY,
          true,
          0 // stack trace - don't need to show
        )
      );
    }

    return next();
  };
}

module.exports = {
  validateMiddleware,
};
