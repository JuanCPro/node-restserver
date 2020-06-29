const express = require('express')
const Usuario = require('../models/usuario')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express()

//Metodo del login
app.post('/login', (req, res) => {

    let body = req.body;
    //Buscamos un usuario por email
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            })
        }
        //Comparamos la contraseña encriptando la misma y viendo si la encriptación hace match 
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: "Contraseña incorrecta"
                }
            })
        }
        //Si la contraseña es correcta
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        //Respondemos con el usuario y la contraseña
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    });
})


module.exports = app;