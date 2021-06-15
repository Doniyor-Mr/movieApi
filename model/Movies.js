const mongoose = require('mongoose')



const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    category:String,
    country:String,
    year:Number,
    user_id:Schema.Types.ObjectId,
    ovoz_ber:Number,
    createAt:{
        type:Date,
        default:Date.now,
    }


})

module.exports = mongoose.model('movie',MoviesSchema)
