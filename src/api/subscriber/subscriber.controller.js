const { pick } = require("lodash");
const subscriberService = require("../../services/subscriber");

/**
 * Post Subscriber
 * @property {string} req.body.email Subscriber Email
 * @returns {<Subscriber, Error>}
 */
async function post(req, res, next) {
  const { email } = req.body;
  if (!email) return { data: {} };
  try {
    const subscriber = await subscriberService.post({
      email,
    });

    return res.json({ data: pick(subscriber, ["email", "id"]) });
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  post,
};
