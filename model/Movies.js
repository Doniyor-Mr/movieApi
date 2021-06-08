const mongoose = require('mongoose')





const MoviesSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    category:String,
    country:String,
    year:Number,
    director_id:Schema.Types.ObjectId,
    ovoz_ber:Number,
    createAt:{
        type:Date,
        date:Date.now,
    }


})

module.exports = mongoose.model('movie',MoviesSchema)
