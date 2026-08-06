import axios from "axios"
import {toast} from "react-toastify"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"

const Login = () =>{
    const navigate = useNavigate()
    const {register, handleSubmit, formState : {errors}} = useForm()
    const handleLogin = async(dataForm)=>{
        try{
        const url = `${import.meta.env.VITE_BACKEND_URL}/usuarios?email=${dataForm.email}&password=${dataForm.password}`
        const res = await axios.get(url)
        localStorage.setItem("token", "token123")
        console.log(res)
        toast.success(`Bienvenido ${res.data[0].name} ${res.data[0].apellido}`)

        setTimeout(()=>{
            navigate("/estudiante")
        },1200)
        }catch(error){
            toast.error(error.response?.data?.msg)
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <input
                type = "email"
                placeholder = "Ingrese su correo electrónico"
                {...register("email",{required: "El email es requerido"})}
                />
                {errors.email && <p style = {{color: "red"}}> {errors.email.message}</p>}
                <input
                type = "password"
                placeholder = "Ingrese su correo electrónico"
                {...register("password",{required: "La contraseña es requerida"})}
                />
                {errors.password && <p style = {{color: "red"}}> {errors.password.message}</p>}    
                <button type= "submit">Iniciar Sesion</button>            
            </form>
        </div>
    )
}
export default Login