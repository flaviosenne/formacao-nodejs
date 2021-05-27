const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/guiapics", 
{ useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("mongo conectado com sucesso")
}).catch(err =>{
    console.log("mongo não conectado")
})
