const mongoose = require('mongoose');

module.exports =() =>{
    mongoose.connect('mongodb+srv://madaminov:iphone11@@cluster0.pnhzl.mongodb.net/test',
        {useFindAndModify:true,useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true})
    const db = mongoose.connection;
    db.on('open',() =>{
        console.log('Mongo db ishga tushdi')
    })
    db.on('error',(err)=>{
        console.log('Mongoda qayerdadur  hatolik bor',err)
    })
}
