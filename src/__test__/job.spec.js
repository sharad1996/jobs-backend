const supertest = require("supertest");
const httpStatus = require("http-status");
const app = require("../index");
const job = require("../job.route");
const mockId = '1';

// async/await can be used.
describe("Apply to job specs", () => {
  describe("Job apply specs", () => {
    test("should return API not found!", async (done) => {
      supertest(app)
        .post("/api/job/:jobId/apply")
        .expect(httpStatus['200'])
        .then((res) => {
          expect(res.body.status).toEqual(200);
          return done();
        })
        .catch(done);
    });

    test("should return jobId validation error", async (done) => {
      supertest(job)
        .post("/api/job/:jobId/apply", (req, res) => {
            expect(req.param.jobId).toEqual(mockId);
            return done();
        })
        .send({ status: httpStatus['200'], message: 'Successfully applied' })
        .then((res) => {
            expect(res.body.status).toEqual(200);
            return done();
          })
        .catch(done);
    });
  });
});
