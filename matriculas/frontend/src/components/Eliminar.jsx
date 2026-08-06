import axios from "axios"
import {toast} from "react-toastify"
const Eliminar = ({rg, tipo, funcionRecargar})=>{
    const handleEliminar = async() =>{
        try{
        const url = `${import.meta.env.VITE_BACKEND_URL}/${tipo}/${rg.id}`
        const res = await axios.delete(url)
        if(res.status === 200){
            toast.info("Se ha eliminado correctamente")
        }
        setTimeout(()=>{
            funcionRecargar()
        },1200)
        }catch(error){
            toast.error(error.response?.data?.msg)
        }
    }
    return (
        <button className = "eliminarBTN" onClick = {handleEliminar}>Eliminar</button>
    )
}
export default Eliminar