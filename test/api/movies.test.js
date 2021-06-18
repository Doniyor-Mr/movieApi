const chai = require ('chai');
const chaiHttp = require ('chai-http');

const should = chai.should ();
const server = require ('../../app') // app.jsdan userni get gacham oladi

chai.use (chaiHttp)

//todo ===================================================================================
let token
describe ('/api/movies larni testdan otqizdik', () => {

    before((done) => {
        chai.request (server) // app.jsdani teksir
            .post ('/auth') // agar tokendan otgan bolsa
            .send ({username: 'kamediya', password: '12345'}) // parol stringda chaqiriladi
            .end ((err, res) => {
                token = res.body.token // komediyani tokeni oziga ovoladi
                done (); // uni tugat
            })

    })
    //todo ===================================================================================
    // -----  token larni solishtirish
    describe ('/Get movies', () => {
        it ('get method orqali movieslarni tekshirdik ', (done) => {
            chai.request (server)
                .get ('/api/movies') // app jsadan /api/moviesdan oladi kinolani tokenini oladi
                .set ('x-acces-token', token) // keyn tokeni ovoladi
                .end ((err, res) => {
                    res.should.have.status (200)
                    res.body.should.be.a ('array'); // malumotla bizga shunaqa korinishda keladi
                    done ();
                })
        })
    })

    //todo ===================================================================================
                   // post orqali malumotlarni kiritish


    describe ('/Post movies', () => {
        it ('Post method orqali kino  qowdik  ', (done) => { //done ohirida caqirib qoyish kere


            const movie = {
                title: 'toshkent',
                category: 'uzbek',
                country: 'uznekistan',
                year: 2000,
                user_id: '60c0e06e256ef424904f3925',
                ovoz_ber: 2,


            }

            //todo ===================================================================================
            // server app.js ga kiradi
            chai.request (server)
                .post ('/api/movies') // app jsadan /api/moviesdan oladi kinolani tokenini oladi
                .send (movie) // shuni jonatgin malumotlarni  yangilidi
                .set ('x-acces-token', token) // keyn tokeni ovoladi
                .end ((err, res) => {
                    res.should.have.status (200)
                    res.body.should.be.a ('object'); // malumotla bizga shunaqa korinishda keladi

                    //malumotlarini oladi
                    res.body.should.have.property ('title')
                    res.body.should.have.property ('category')
                    res.body.should.have.property ('country')
                    res.body.should.have.property ('year')
                    res.body.should.have.property ('user_id')
                    res.body.should.have.property ('ovoz_ber')
                    movieId = res.body._id // shu yaralgan moviesni idisi
                    done ();
                })
        })
    })
 //todo ===================================================================================
    // get orqali idini korish va postda yaratilgan idi ni bilib olib test qilish

    describe ('get method  orqali Id  test qilish', () => {
        it ('/get/movies/id ni testdan otqazdik', (done) => {
            chai.request (server)
                .get (`/api/movies/${movieId}`) // yaralgan movies ni idisini olamiz
                .set ('x-acces-token', token) // tokenini  soliwtramiz bormi yoqmi
                .end ((err, res) => { // va togri bolsa 200 bn ishlatamiz
                    res.should.have.status (200)
                    res.body.should.be.a ('object' ) // ularni object koriniwda qaytaramiz
                    //malumotlarini oladi
                    res.body.should.have.property ('title')
                    res.body.should.have.property ('category')
                    res.body.should.have.property ('country')
                    res.body.should.have.property ('year')
                    res.body.should.have.property ('user_id')
                    res.body.should.have.property ('ovoz_ber')
                    res.body.should.have.property('_id').eql(movieId) // ohirida shu idisi borligini korsatamiz

                    done();

                })
        })
    })


})


