import axios from "axios"
import {toast} from "react-toastify"

const Eliminar = ({tipo, id , recargarLista}) => {
    const handleEliminar = async() => {
        if(!window.confirm("Está seguro de elinar el cleinte? ")) return
        try{
        const token = localStorage.getItem("token")
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/${tipo}/eliminar?token=${token}&idCliente=${id}`)
        {console.log(id)}
        toast.info("Cliente eliminado correctamente")
        setTimeout(()=> {
            if(recargarLista) recargarLista()
        }, 1200)
        }catch(error){
            toast(error.response?.data?.msg)
        }
    }
    return (
        <button onClick={handleEliminar}>
            Eliminar Cliente 
        </button>
    )
}

export default Eliminar