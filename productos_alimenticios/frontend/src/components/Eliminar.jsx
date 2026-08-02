import axios from "axios"
import {toast} from "react-toastify"

const Eliminar = ({tipo, id , recargarLista}) => {
    const handleEliminar = async() => {
        if(!window.confirm("Está seguro de elinar el cleinte? ")) return
        try{
        const token = localStorage.getItem("token")
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/${tipo}/eliminar?token=${token}&id=${id}`)
        {console.log(id)}
        toast.info(res.data.msg)
        setTimeout(()=> {
            if(recargarLista) recargarLista()
        }, 1200)
        }catch(error){
            toast.error(error.response?.data?.msg)
        }
    }
    return (
        <button onClick={handleEliminar}>
            Eliminar 
        </button>
    )
}

export default Eliminar