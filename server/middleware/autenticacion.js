const jwt = require('jsonwebtoken');


//=================
//Verificar token
//=================
//Verificamos si el token es correcto y no ha sido manipulado por alguien
let verificarToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        //Si el token es incorrecto mandamos error
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.usuario = decoded.usuario;
        //Importante llamar next para ejecutar lo que va despues del middelware
        next();
    });

};

//=================
//Verificar AdminRole
//=================
let verificarAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    //Verificamos si el usuario es o no administrador
    if (!(usuario.role == "ADMIN_ROLE")) {
        return res.json({
            ok: false,
            err: {
                message: 'Acción valida solo para usuario administradores'
            }
        })
    } else {
        //Si el usuario es admin ejecuta el codigo siguiente
        next();
    }




};


module.exports = {
    verificarToken,
    verificarAdmin_Role
}