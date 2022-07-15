const request = require("supertest");
const app = require("../app");

describe ("API", () => {
    let api;

    beforeAll(() => {
        api = app.listen(3030);
    })

    afterAll((done) => {    
        api.close(done)
    })

    it("Reponds to a GET request at / with a 200 status", (done) => {
        request(api).get("/").expect(200, done);
    })

    it("Reponds to a GET request at /flavours with a 200 status", (done) => {
        request(api).get("/flavours").expect(200, done);
    })

    it("Reponds to a GET request at /flavours with a JSON object", (done) => {
        request(api).get("/flavours").expect('Content-Type', /json/, done);
    })

    // it("Reponds to a GET request at /flavours with a JSON object that has flavours", (done) => {
    //     request(api).get("/flavours").end((err, res) => {
    //         const data = res.body;
    //         expect("flavour" in data);
    //         expect(data["flavours"] instanceof Array);
    //         done();
    //     });
    // })
})
