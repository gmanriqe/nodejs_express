const jwt = require('jsonwebtoken');
/**
 * Creación de Middleware
 * Verificar Token
 */
let verificaToken = (req, res, next) => {
    // Leyendo los token que enviamos en los header ➡️ req.get('');
    let token = req.get('token');

    jwt.verify( token, process.env.SEED, (err, decoded) => { // decoded ➡️ es el payload
        if(err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token invalido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

/**
 * Creación de Middleware
 * Verificar Rol Administrador
 */
let verificaAdminRol = (req, res, next) => {
    if (req.usuario === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
    console.log(req.usuario);
};

module.exports = {
    verificaToken: verificaToken,
    verificaAdminRol: verificaAdminRol
};