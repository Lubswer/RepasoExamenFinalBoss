import {Schema, model} from "mongoose"

const pedidosSchema = new Schema({
    codigo: {
        type : String,
        required: true,
        unique: true
    },
    descripcion : {
        type: String,
        required: true,
        default: "Sin descripción"
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "cliente",
        required: true,
        default: null
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: "producto",
        required: true,
        default: null
    }
},{
    timestamps: true
})

export default model("pedido", pedidosSchema)