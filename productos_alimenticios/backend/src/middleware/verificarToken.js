

const verificarToken = (req, res, next) =>{

    const {token} = req.query

    if(token !== "token123"){
        return res.status(401).json({msg: "Sin acceso, token invalido o expirado"})
    }
    next()
}

export default verificarToken