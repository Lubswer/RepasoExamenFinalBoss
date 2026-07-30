import producto from "../models/productos.js"
import mongoose from "mongoose"

const registro = async(req, res) => {
    try{

        const {nombre,descripcion,categoria,precio,stock,proveedor} = req.body

        if(Object.values(req.body).includes("") || !nombre || !descripcion || !categoria || !precio || !stock || !proveedor){
            return res.status(400).json({msg : "Todos los campos deben ser llenados"})
        }

        const regexPrecio = /^\d+(\.\d{1,2})?$/

        if(!regexPrecio.test(precio)){
            return res.status(400).json({msg : "El precio debe ser un número. Ejm(4 , 4.00, 5.99)"})
        }

        const regexStock = /^\d+$/
        
        if(!regexPrecio.test(stock)){
            return res.status(400).json({msg : "El Stock debe ser un número entero Positivo"})
        }

        const nuevoProduto = new producto(req.body)

        let codigo = Math.floor( 1000 + Math.random() * 9000)

        while(await producto.findOne({codigo})){
            codigo = math.floor( 1000 + math.random() * 9000)
        }

        nuevoProduto.codigo = codigo

        await nuevoProduto.save()

        res.status(200).json({msg: "Producto creado correctamente", nuevoProduto})

    }catch(error){

        res.status(500).json({msg : `Error del servidor - ${error.message}`})

    }
}

const listar = async(req , res) => {
    try{

        const productos = await producto.find()
        res.status(200).json({msg : "Productos Listados correctamente", productos})


    }catch(error){

    }
}

const eliminar = async(req, res) => {
    try{

        const {idProducto} = req.query

        if(!mongoose.Types.ObjectId.isValid(idProducto)){
            return res.status(404).json({msg :   `La ID - ${idProducto} No complue con el formato correcto`})
        }

        const verificarID = await producto.findById(idProducto)

        if(!verificarID){
            return res.status(400).json({msg : "La ID no ha sido encontrada"})
        }

        await producto.findByIdAndDelete(idProducto)

        res.status(200).json({msg : "Producto eliminado correctamente"})

    }catch(error){

        return res.status(500).json({msg : `Error del Servidor - ${error.message} `})

    }
}

const actualizar = async(req, res) => {
    try{

        const {idProducto} = req.query

        if(!mongoose.Types.ObjectId.isValid(idProducto)){
            return res.status(404).json({msg :   `La ID - ${idProducto} No complue con el formato correcto`})
        }

        const verificarID = await producto.findById(idProducto)

        if(!verificarID){
            return res.status(400).json({msg : "La ID no ha sido encontrada"})
        }
        const {nombre,descripcion,categoria,precio,stock,proveedor} = req.body

        if(Object.values(req.body).includes("")){
            return res.status(400).json({msg : "Todos los campos deben ser llenados"})
        }

        const regexPrecio = /^\d+(\.\d{1,2})?$/

        if(!regexPrecio.test(precio)){
            return res.status(400).json({msg : "El precio debe ser un número. Ejm(4 , 4.00, 5.99)"})
        }

        const regexStock = /^\d+$/
        
        if(!regexPrecio.test(stock)){
            return res.status(400).json({msg : "El Stock debe ser un número entero Positivo"})
        }

        const productoActualizar = await producto.findById(idProducto)

        productoActualizar.nombre =  nombre ?? productoActualizar.nombre
        productoActualizar.descripcion = descripcion ?? productoActualizar.descripcion
        productoActualizar.categoria = categoria ?? productoActualizar.categoria
        productoActualizar.precio = precio ?? productoActualizar.precio
        productoActualizar.stock = stock ?? productoActualizar.stock
        productoActualizar.proveedor = proveedor ?? productoActualizar.proveedor

        await productoActualizar.save()
        
        res.status(200).json({msg : "Prodcuto actualizado correctamente", productoActualizar})
    }catch(error){

    }
}
export {
    registro,
    listar,
    eliminar,
    actualizar
}