import {Navigate, Outlet} from "react-router-dom"
import Navbar from "./Navbar.jsx"

const RutaProtegida = () =>{
    const token = localStorage.getItem("token")
    if(token !== "token123"){
        return <Navigate to = "/usuarios"/>
    }

    return(
        <>
        <Navbar/>
        <div className="contenedor-centrado">
            <Outlet/>
        </div>
        </>
    )
}

export default RutaProtegida