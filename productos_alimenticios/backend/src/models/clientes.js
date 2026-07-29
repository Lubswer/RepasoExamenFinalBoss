import {Schema, model} from "mongoose"

const clienteSchema = new Schema({
    cedula: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    apellido: {
        type: String,
        trim: true,
        required: true
    },
    ciudad: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        trim: true,
        required: true
    },
    telefono: {
        type: String,
        trim: true,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        trim: true,
        required: false,
        default: null
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuario",
        required: true
    },
    status: {
        type:Boolean,
        required: true,
        default: true
    }
},{
    timestamps: true
})

export default model("cliente", clienteSchema)