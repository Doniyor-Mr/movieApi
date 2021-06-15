const jwt =require('jsonwebtoken')


//agar token kirtsek yoki postmandan
module.exports =(req,res,next) =>{
    //agar token true bolsa shulardan oladi || yoki url adressdan req.query.token
    const token = req.headers['x-acces-token'] || req.body.token || req.query.token


    //agar token true  bolsa tokeni  raqamlarini tekshiradi
    if(token){
        // tepadegi tokenimiz bolsa  toke ni tekwiradi || err -dec qaytaradi
        jwt.verify(token, req.app.get('secret_key'),(err,dec) =>{
            //agar hato bolsa
            if(err){
                res.json({status:false,msg:'Kira olmaysiz'})
            }
            else{
                req.decoded = dec
                next() //agar togri kelsa next ishlidi otqzvoradi app.jsga
            }
        })
    }
    //registratsiya dan otilmasa shuni qaytaradi
    else{
        res.json({status:false, msg:'token topilmadi '})

    }
}
