require('./config/config')

const express = require('express')
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

//Usando express
const app = express()



// Usando BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())


//Configuración global de rutas
app.use(require('./routes/index'))



mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {
    if (err) { throw err }

    console.log("Base de datos ONLAIN")
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT)
})