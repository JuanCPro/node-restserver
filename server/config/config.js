//==============
//Puerto
//==============

process.env.PORT = process.env.PORT || 3000;

//==============
//Entorno
//=============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==============
//Vencimiento del token
//=============
//60 segundos
//60 minutos
//24 Horas
// 30 Dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//==============
//SEED de autenticación del token
//=============
//Si estamos en modo de desarrollo tomará como semilla del token 'Este-es-el-seed-desarrollo'
process.env.SEED = process.env.SEED || 'Este-es-el-seed-desarrollo'



//==============
//Base de datos
//=============

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://juan:perfecchoise@cluster0-warle.mongodb.net/cafe'
}
//urlDB = 'mongodb+srv://juan:perfecchoise@cluster0-warle.mongodb.net/cafe'
process.env.URLDB = urlDB;