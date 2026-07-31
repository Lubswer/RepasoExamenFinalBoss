import {Link, useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
const Navbar = () =>{
    const navigate = useNavigate()

    const cerrarSesion = ()=>{
        localStorage.clear()
        toast.info("La sesion ha sido cerrada")
        setTimeout(() => {
            navigate("/login")
        }, 1500)
    }

    return(
        <nav style={{display : "flex", gap : "60px", justifyContent: "center"}}>
            <ToastContainer/>
            <h2>Repaso Examen</h2>
            <div>
                <Link to = "/productos"> Productos</Link>
                <Link to = "/clientes"> Clientes</Link>
                <Link to = "/pedido"> Pedidos</Link>
            </div>
            <button onClick = {cerrarSesion}>
                Cerrar Sesion
            </button>
        </nav>
    )
}

export default Navbar