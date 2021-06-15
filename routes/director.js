const express = require ('express');
const router = express.Router ();
const Director = require ('../model/Director')
const mongoose = require ('mongoose')


// todo qidirsih ====
router.get('/', (req,res,next) =>{
    const user = Director.find({});

    user.then(data =>{
        res.json(data)
    }).catch(err =>{
        console.log(err)
    })
})

//todo get user ulimiz agregat ==

router.get ('/', (req, res, next) => {
    //usersga kirasan
    const user = Director.aggregate ([
        {
            $lookup: {
                from: 'movies',//users mongo atlasdegi
                localField: '_id',// userni idi bilan movies ni user_id bn bir hil boldi
                foreignField: `user_id`,//Movies ni user_idsini ol uni kino kategoriyaga sol
                as: 'kino',//uni kino qilib oladi
            }
        },
        {

            $unwind: {
                path: `$kino`
                //kino yozilgan joyga kiradi faqat shu tarafini korsatadi
            }
        },
        {
            //todo userni olib uni shu toigfalarini cqaradi
            $group: {
                _id: {
                    _id: `$_id`,
                    name: `$name`,
                    surname: `$surname`,
                    bio: `$bio`,
                },


                //todo || va usersni ichiga moviesni idisiga togri kelgan kino cconnectioni  push qiladi
                movies: {
                    $push: `$kino`
                }


            }


        },
        //qisqartma tutish
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                kino: '$kino'
            }
        }


    ])
    user.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })
})


//todo idi orqali tutish

router.get ('/:us_id', (req, res, next) => {
    //usersga kirasan
    const user = Director.aggregate ([

        {
            $match: {
                '_id': mongoose.Types.ObjectId (req.params.us_id)
            }
        },
        {
            $lookup: {
                from: 'movies',//users mongo atlasdegi
                localField: '_id',// userni idi bilan movies ni user_id bn bir hil boldi
                foreignField: `user_id`,//Movies ni user_idsini ol uni kino kategoriyaga sol
                as: 'kino',//uni kino qilib oladi
            }
        },
        {

            $unwind: {
                path: `$kino`
                //kino yozilgan joyga kiradi faqat shu tarafini korsatadi
            }
        },
        {
            //todo userni olib uni shu toigfalarini cqaradi
            $group: {
                _id: {
                    _id: `$_id`,
                    name: `$name`,
                    surname: `$surname`,
                    bio: `$bio`,
                },


                //todo || va usersni ichiga moviesni idisiga togri kelgan kino cconnectioni  push qiladi
                movies: {
                    $push: `$kino`
                }


            }


        },
        //qisqartma tutish
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                kino: '$kino'
            }
        }


    ])
    user.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })
})

//todo|| malumot qoshish
router.post ('/', (req, res, next) => {
    const user = new Director (req.body)

    const promise = user.save ();

    promise.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })
})

//todo || idi orqali yangilash
router.put ('/:us_id', (req, res) => {
    const promise = Director.findByIdAndUpdate (req.params.us_id, req.body, {new: true});

    promise.then(data =>{
        res.json(data)
    }).catch(err =>{
        console.log(err)
    })
})

//TODO || idi orqali  ochirish - DELETE
router.delete ('/:us_id', (req, res) => {
    const promise = Director.findByIdAndDelete (req.params.us_id);

    promise.then(data =>{
        res.json(data)
    }).catch(err =>{
        console.log(err)
    })
})

//todo || top10 qidirish
router.get ('/:user_id/top10', (req, res, next) => {


    //usersga kirasan
    const user = Director.aggregate ([

        {
            //idisi shunga tori kelsa
            $match: {
                '_id': mongoose.Types.ObjectId (req.params.user_id)
            }
        },
        {
            $lookup: {
                from: 'movies',//users mongo atlasdegi
                localField: '_id',// userni idi bilan movies ni user_id bn bir hil boldi
                foreignField: `user_id`,//Movies ni user_idsini ol uni kino kategoriyaga sol
                as: 'kino',//uni kino qilib oladi
            }
        },
        {

            $unwind: {
                path: `$kino`
                //kino yozilgan joyga kiradi faqat shu tarafini korsatadi
            }
        },
        {
            //todo userni olib uni shu toigfalarini cqaradi
            $group: {
                _id: {
                    _id: `$_id`,
                    name: `$name`,
                    surname: `$surname`,
                    bio: `$bio`,
                },


                //todo || va usersni ichiga moviesni idisiga togri kelgan kino cconnectioni  push qiladi
                movies: {
                    $push: `$kino`
                }


            }


        },
        //qisqartma tutish
        {
            $project: {
                _id: false,
                kino: '$kino'
            }
        }


    ])
    user.then (data => {
        res.json (data)
    }).catch (err => {
        console.log (err)
    })
})

module.exports = router
