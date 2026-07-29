import usuario from "../models/usuario.js"

const registro = async(req,res) => {

    try{

    const {nombre,apellido,email,password} = req.body

    if(Object.values(req.body).includes("") || !nombre || !apellido || !email || !password){
        return res.status(400).json({msg : "Debe llenar todos los campos"})
    }

    if(!email.includes("@")){
        res.status(400).json({msg : "El formato del correo es incorrecto, hace falta el `@`"})
    }
    if(password.length < 8){
        res.status(400).json({msg: "La contraseña no debe tener menos de 8 caracteres"})
    }

    const verificarEmail = await usuario.findOne({email})

    if(verificarEmail){
       return res.status(400).json({msg : "El email ya se encuentra registrado!!"}) 
    }

    const nuevoUsuario = new usuario(req.body)

    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)

    await nuevoUsuario.save()

    res.status(200).json({msg : "Usuario guardado correctamente!!"})

    }catch(error){
        res.status(500).json({msg: `Error del Servidor  - ${error}`})
    }
    

}

const login = async(req, res) =>{

    try{
        const {email, password} = req.body

        if(Object.values(req.body).includes("") || !email || !password){

            res.status(400).json({msg : "Debe llenar todos los campos"})

        }

        const usuarioBD = await usuario.findOne({email})

        if(!usuarioBD){

            res.status(404).json({msg : `El usuario con email ${email} no se encuentra registrado`})

        }

        const verificarPassword = usuarioBD.matchPassword(password)

        if(!verificarPassword){
            res.status(400).json({msg : "Credenciales inválidas"})
        }

        usuarioBD.token = "token123"

        await usuarioBD.save()

        const {nombre, apellido, _id} = usuarioBD

        res.status(200).json({ msg: "Inicio de sesión exitoso", 
            nombre,
            apellido,
            _id,
            email: usuarioBD.email,
            token: usuarioBD.token
        })

    }catch(error){
        res.status(500).json({msg : `Error del servidor - ${error}`})
        console.error(error)
    }
}

export {
    registro,
    login
}