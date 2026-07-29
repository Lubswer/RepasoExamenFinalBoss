import {Schema, model} from "mongoose"
import bcrypt from "bcryptjs"

const usuarioSchema = new Schema({
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
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        trim: true,
        required: false,
        default: null
    }
},{
    timestamps: true
})

usuarioSchema.methods.encryptPassword = async function(password){

    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

usuarioSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

export default model("usuario", usuarioSchema)