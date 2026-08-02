import {Schema, model} from "mongoose"

const productoSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true        
    },
    codigo: {
        type: String,
        trim: true,
        required: true        
    },
    descripcion: {
        type: String,
        required: false        
    },
    categoria: {
        type: String,
        required: true        
    },
    precio: {
        type: String,
        trim: true,
        required: true        
    },
    stock: {
        type: String,
        trim: true,
        required: true        
    },
    fecha_ingreso: {
        type: Date,
        trim: true,
        default: Date.now       
    },
    proveedor: {
        type: String,
        required: true        
    },
    status: {
        type: Boolean,
        default: true   
    }
},{
    timestamps: true
})

export default model("producto", productoSchema)