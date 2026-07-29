import cliente from "../models/clientes.js"
import usuario from "../models/usuario.js"
import mongoose from "mongoose"

const registro = async(req, res) =>{

    try{
        const {id} = req.query

        if(Object.values(req.query).includes("")){
            return res.status(400).json("Sin token o id de usuario")
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg : `El id - ${id} No cuenta con un formato válido`})
        }

        const verificarID = await usuario.findById(id)

        if(!verificarID){
            return res.status(404).json({msg: "ID de usuario no encontrada"})
        }


        const {cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento} = req.body

        if(Object.values(req.body).includes("") || !cedula || !nombre || !apellido || !ciudad || !email || !direccion || !telefono || !fecha_nacimiento){
            return res.status(400).json("Debe llenar todos los campos")
        }

        const verificarEmail = await cliente.findOne({email})
        if(verificarEmail){
            return res.status(400).json({msg : "El email ya se encuentra registrado"})
        }

        const verificarCedula = await cliente.findOne({cedula})
        if(verificarCedula){
            return res.status(400).json({msg : "La cédula ya se encuentra registrada"})
        }

        const regexFecha = /^\d{4}-\d{2}-\d{2}$/ 

        if(!regexFecha.test(fecha_nacimiento)){
            return res.status(400).json({msg : "El formato de la fecha debe ser AAAA-MM-DD"})
        }

        const nuevoCliente = new cliente(req.body)

        nuevoCliente.usuario = id

        nuevoCliente.save()

        res.status(201).json({msg: "Cliente creado correctamente"})

    }catch(error){

        res.status(500).json(`Error en el Servidor - ${error.message}`)

    }

}

const listar = async (req, res) => {


    try{
    const {id} = req.query
    const clientes = await cliente.find({ usuario: id }).select("-_id -__v").populate("usuario", "nombre apellido _id")
    res.status(200).json(clientes)
    }catch(error){
        res.status(500).json(`Error en el Servidor - ${error.message}`)
    }
}

const eliminar = async (req, res) => {
    try{
        const {idCliente} = req.query
        
        if(!mongoose.Types.ObjectId.isValid(idCliente)){
            return res.status(404).json({msg: "ID del cliente no comple el formato"})
        }

        const clienteEliminado = await cliente.findByIdAndUpdate(idCliente, {status : false})

        if(!clienteEliminado){
            return res.status(404).json({msg : "ID del cliente no ha sido encontrada"})
        }

        clienteEliminado.save()

        res.status(200).json({msg : "Cliente eliminado correctamente"})

    }catch(error){

        res.status(500).json({msg : `Error en el Servidor - ${error.message}`})

    }
}

const actualizar = async (req , res) => {
    try{
        const {idCliente} = req.query
        
        if(!mongoose.Types.ObjectId.isValid(idCliente)){
            return res.status(404).json({msg: "ID del cliente no comple el formato"})
        }

        const clienteActualizar = await cliente.findById(idCliente)

        if(!clienteActualizar){
            res.status(404).json({msg : `El cliente con ID - ${idCliente} No ha sido encontrado`})
        }

        const {cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento} = req.body

        if(Object.values(req.body).includes("")){
            return res.status(400).json("Debe llenar todos los campos")
        }

        if(email){
            const verificarEmail = await cliente.findOne({email})
            if(verificarEmail){
               return res.status(400).json({msg : "El email ya se encuentra registrado"})
            }
        }
        if(cedula){
            const verificarCedula = await cliente.findOne({cedula})
            if(verificarCedula){
               return res.status(400).json({msg : "La cédula ya se encuentra registrada"})
            }
        }
        if(fecha_nacimiento){
            const regexFecha = /^\d{4}-\d{2}-\d{2}$/ 
            if(!regexFecha.test(fecha_nacimiento)){
               return res.status(400).json({msg : "El formato de la fecha debe ser AAAA-MM-DD"})
            }
        }

        clienteActualizar.cedula = cedula ?? clienteActualizar.cedula
        clienteActualizar.nombre = nombre ?? clienteActualizar.nombre
        clienteActualizar.apellido = apellido ?? clienteActualizar.apellido
        clienteActualizar.ciudad = ciudad ?? clienteActualizar.ciudad
        clienteActualizar.email = email ?? clienteActualizar.email
        clienteActualizar.direccion = direccion ?? clienteActualizar.direccion
        clienteActualizar.telefono = telefono ?? clienteActualizar.telefono
        clienteActualizar.fecha_nacimiento = fecha_nacimiento ?? clienteActualizar.fecha_nacimiento

        await clienteActualizar.save()

        res.status(200).json({msg : "Cliente actualizado correctamente!!", clienteActualizar})


    }catch(error){

    }
}

export {
    registro,
    listar,
    eliminar,
    actualizar
}