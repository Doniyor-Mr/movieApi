const express = require ('express');
const router = express.Router ();
const Movies = require ('../model/Movies')

/* GET home page. */
// router.get ('/', (req, res, next) => {
//     res.render ('index', {title: 'Express'});
// });


//todo || --- malumotlar yaratish ---

router.post ('/', (req, res, next) => {

    const movie = new Movies (req.body)

    const promise = movie.save ();

    promise.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })

});

//todo Get -- malumotlarni olish

router.get ('/', (req, res, next) => {
    const promise = Movies.find ({})

    promise.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })
});

//todo  /api/movies/:id idi orqali tutish
//owatga yozgan idini cqaradi :id
router.get ('/:id', (req, res) => {
    const promise = Movies.findById (req.params.id)

    promise.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })

})

//todo || Put - yangilash ---

router.put ('/:id', (req, res) => {
    const promise = Movies.findByIdAndUpdate (
        req.params.id,
        req.body);

    promise.then (data => {
        res.json (data)
    }).catch (err => console.log (err)
    )
})


//todo || udalit qilish ===

router.delete ('/:id', (req, res) => {
    const promise = Movies.findByIdAndRemove (req.params.id);

    promise.then (data => {
        res.json (data)
    }).catch (err => console.log (err)
    )
})

//todo top 10 lani qidiring

router.get ('/top/top10', (req, res, next) => {
    const promise = Movies.find ({}).limit (10).sort ({ovoz_ber: -1})

    promise.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })
})


//todo || shu yildan shu  yilgacham bogan narsalani chiqaradi

router.get ('/yil/:start/:end', (res, req, next) => {

    const {start, end} = req.params
    //todo hama  yilani olamiz
    const promise = Movies.find ({
        year: {'$gte': parseInt (start), '$lte': parseInt (end)}
    })
    promise.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })
})


module.exports = router;
