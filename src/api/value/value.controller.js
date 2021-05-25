const valueService = require("../../services/value");

/**
 * List values
 * @property {string} req.params.skip number of users to be offset
 * @property {string} req.params.first number of users to be listed
 * @returns {<User[], Error>}
 */
async function list(req, res, next) {
  try {
    const values = await valueService.list();

    return res.json({ data: values });
  } catch (e) {
    return next(e);
  }
}

/**
 * Get value
 * @property {string} req.params.valueId Value Id
 * @returns {<Value, Error>}
 */
async function get(req, res, next) {
  const { valueId } = req.params;
  if (!valueId) return { data: {} };
  try {
    const values = await valueService.list({
      id: valueId,
      // description: true,
      // is_active: { equals: true },
    });
    return res.json({ data: values[0] });
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  list,
  get,
};
