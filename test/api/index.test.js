const chai = require ('chai');
const chaiHttp = require ('chai-http');

const should = chai.should ();
const server = require ('../../app') // app.jsdan userni get gacham oladi

chai.use (chaiHttp)


describe (`bosh sahifani testdan otqizdik`, () => {
    it ('Get method orqali bosh sahifani tekishiruvdan otqazdik', (done) => {
        chai.request (server)
            .get ('/')
            .end ((err, res) => {
                res.should.have.status (200)
                done ()
            })
    })
})
