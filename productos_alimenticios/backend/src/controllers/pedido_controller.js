import pedido from "../models/pedidos.js"
import mongoose from "mongoose"
import cliente from "../models/clientes.js"
import producto from "../models/productos.js"

const registrar = async(req, res) => {
    try{
        
        const {idCliente, idProducto} = req.query

        if(!mongoose.Types.ObjectId.isValid(idCliente)){
            return res.status(404).json({msg : `La id del cliente no tiene un formato válido`})
        }

        if(!mongoose.Types.ObjectId.isValid(idProducto)){
            return res.status(404).json({msg : `La id del producto no tiene un formato válido`})
        }

        if(! await cliente.findById(idCliente)){
            return res.status(404).json({msg : `El cliente no ha sido encontrado`})
        }
        if(! await producto.findById(idProducto)){
            return res.status(404).json({msg : `El producto no ha sido encontrado`})
        }
        const nuevoPedido = pedido(req.body)

        let codigo = Math.floor(1000 + Math.random() * 9000)

        while( await pedido.findOne({codigo})){
            codigo = Math.floor(1000 + Math.random() * 9000)
        }

        nuevoPedido.cliente = idCliente
        nuevoPedido.producto = idProducto
        nuevoPedido.codigo = codigo

        const stockProducto = await producto.findById(idProducto)

        if(stockProducto.stock <= 0){
            return res.status(400).json({msg : "El producto no se encuentra en stock!!"})
        }

        const nuevoStock = stockProducto.stock - 1 

        await producto.findByIdAndUpdate(idProducto,{stock : nuevoStock})

        await nuevoPedido.save()

        res.status(200).json({msg : "El pedido ha sido creado correctamente!!", nuevoPedido})

    }catch(error){
        res.status(500).json({msg : `Error del Servidor - ${error.message}`})
        console.error(error)
    }
}

const listar = async(req , res) => {
    try{

        const pedidos = await pedido.find().populate("cliente", "nombre email apellido").populate("producto", "nombre precio stock")

        res.status(200).json(pedidos)

    }catch(error){

        res.status(500).json(`Error del Servidor - ${error.message}`)

    }
}

const actualizar = async(req , res) => {

    try{

    const {descripcion} = req.body

    const {idPedido} = req.query

    if(!mongoose.Types.ObjectId.isValid(idPedido)){
        return res.status(404).json({msg : "La ID no comple el formato correcto"})
    }

    const pedidoActualizar = await pedido.findById(idPedido)

    if(!pedidoActualizar){
        return res.status(404).json({msg : "Pedido no encontrado"})
    }

    pedidoActualizar.descripcion = descripcion

    await pedidoActualizar.save()

    res.status(200).json({msg : "Pedido actualizado correctamente", pedidoActualizar})
    }catch(error){
        res.status(500).json(`Error del Servidor - ${error.message}`)
    }

}

const eliminar = async (req, res) => {


    try{
    const {idPedido} = req.query

    if(!mongoose.Types.ObjectId.isValid(idPedido)){

        return res.status(404).json({msg : "La ID no cumple con el formato valido"})
    }

    const pedidoEliminar = await pedido.findById(idPedido)

    if(!pedidoEliminar){
        return res.status(404).json({msg : `Pedido con ID ${idPedido} No fue encontrado`})
    }

    await pedido.findByIdAndDelete(idPedido)

    res.status(200).json({msg : "Pedido eliminado correctamente"})
    }catch(error){
        res.status(500).json({msg : `Error del Servidor - ${error.message}`})
    }

}

export {
    registrar,
    listar,
    actualizar, 
    eliminar
}