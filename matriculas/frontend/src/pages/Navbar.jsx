import {NavLink, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const Navbar = ()=>{
    const navigate = useNavigate()
    const cerrarSesion = () => {
        try{
            localStorage.clear()
            toast.info("La sesion ha sido cerrada")
            setTimeout(()=>{
                navigate("/usuarios")
            },1200)
        }catch(error){
            toast.error(error.response.msg)
        }
    }
    return(
        <div className = "navBarItem">
            <h2>Examen</h2>
            <div className = "navItem">
            <div className = "sectionNav"><NavLink to = "/estudiante">Estudiantes</NavLink></div>
            <div className = "sectionNav"><NavLink to = "/materia">Materias</NavLink></div>
            <div className = "sectionNav"><NavLink to = "/matricula">Matriculas</NavLink></div>
            </div>

            <button onClick={cerrarSesion}>Cerrar Sesion</button>
 
            

        </div>
    )
}
export default Navbar