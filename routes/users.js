const express = require ('express');
const router = express.Router();
const User = require ('../model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get ('/', (req, res, next) => {
    res.render ('index', {title: 'Express'});

})

router.post ('/register', (req, res) => {

    //todo || posmanda yozgan kod tuWadi passwordga
    const {username, password} = req.body;

    //todo | passwordegi  123 hashga tushadi 10 talik uzunligi boladi
    bcrypt.hash(password,10,(err,hash)=>{

        const user = new User ({
            username,
            password:hash, //todo || passwordga hashlangan kodi yozadi
        })

        const promise = user.save ();
        promise.then (data => res.json (data))
            .catch (err => console.log (err))

    })


})


//todo ============ auth ===================================
router.post ('/auth', (req, res) => {


    const {username, password} = req.body;

    //username ni user oz ichiga oladi
    User.findOne({ username },(err,user)=>{

        if (err)
            throw err;
        // todo : agar kevotgan user user bolmasa shuni chiqaradi
        if (!user){
            res.json({status:'Topilmadi idi ',msg:"Kirish Muffoqiyatsiz faqat admin kirish mumkun"})
        }
        //todo ||  else da agar user kirsa
        else{
            // parolni  bizaga qaytarib beradi  usernemi passwortini uni soliwtradi
            bcrypt.compare(password,user.password).then((result) =>{
                // agar kegan parol natori  tersa
                if(!result) {
                    res.json ({status: false, msg: "Foydalanuvchi paroli natori "})

                }
                //agar parol tori kelsa  username chiqar
                else{
                    const  payload = {username}
                    // secret_key ni app.js dan olib keladi app.set dagi
                    const token= jwt.sign(payload,req.app.get('secret_key'),{
                        expiresIn:720 //12soat  turadi kompyuterga hotira jonatadi
                    })
                    // res.jsonda uni tutvolamiz korsatgin
                    res.json({
                        status:true,
                        token // 12soatli tokeni koramiz
                    })

                }
            })

        }


    })


})


module.exports = router;
