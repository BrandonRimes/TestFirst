const chai = require("chai");
const dotenv = require("dotenv");
const mocha = require("mocha")
const chaiHttp = require("chai-http")
chai.use(chaiHttp)
const { app } = require("../app");

//create book
describe("bookRoute.js", () => {
    it("Should allow book to be created", async () => {
        const response = await chai.request(app).post("/book/create").send({
            title: "test book",
            author: "mr test book",
            genre: "self help",
            fiction: true,
            checked: false
        });
        this.bookId = response.body._id
        chai.expect(response.status).to.eq(200);
        chai.expect(response.body._id).to.exist;
    });
    //check out
    it("Should allow book to be checked out", async () => {
        const response = await chai.request(app)
        .patch(`/book/checkout/${this.bookId}`).send({
            checked: true
        })
        chai.expect(response.status).to.eq(200);
        chai.expect(response.body._id).to.exist;
        chai.expect(response.body.checked).to.eq(true)
    
        
    })
    // checked in
    it("Should allow book to be checked in", async () => {
        const response = await chai.request(app)
        .patch(`/book/checkedin/${this.bookId}`).send({
            checked: false
        })
        chai.expect(response.status).to.eq(200);
        chai.expect(response.body._id).to.exist;
        chai.expect(response.body.checked).to.eq(false)
    })
    it("Should allow user to view all books", async () => {
        const response = await chai.request(app)
        .get("/book/")
        chai.expect(response.status).to.eq(200);
        chai.expect(response.body.length).to.eq(1);
    })
});