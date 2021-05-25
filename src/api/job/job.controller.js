const jobService = require("../../services/job");
const applicantService = require("../../services/applicant");

/**
 * List users
 * @property {string} req.params.skip number of users to be offset
 * @property {string} req.params.first number of users to be listed
 * @returns {<User[], Error>}
 */
async function list(req, res, next) {
  try {
    const jobs = await jobService.list();
    return res.json({ data: jobs });
  } catch (e) {
    return next(e);
  }
}

/**
 * Get job
 * @property {string} req.params.jobId Job Id
 * @returns {<Job, Error>}
 */
async function get(req, res, next) {
  const { jobId } = req.params;
  if (!jobId) return { data: {} };
  try {
    const jobs = await jobService.list({
      id: jobId,
      // description: true,
      // is_active: { equals: true },
    });
    return res.json({ data: jobs[0] });
  } catch (e) {
    return next(e);
  }
}

/**
 * Post apply
 * @property {string} req.body.email {string} req.body.name {number} req.body.number
 * @returns {<Job, Error>}
 */
 async function apply(req, res, next) {
  const { email, name, number } = req.body;
  console.log('values', req.body)
  if (!email) return { message: 'email is required' };
  try {
    const applicant = await applicantService.update({
      email,
      name,
      number
    });
    const applicantId = pick(applicant, ["id"]);
    await jobService.post({
      jobId,
      applicantId
    });

    return res.json({ message: 'Succefully applied' });
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  list,
  get,
  apply,
};
