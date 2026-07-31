import Navbar from "./Navbar"
import {Navigate, Outlet} from "react-router-dom"


const RutaProtegida = () =>{

    const token = localStorage.getItem("token")

    if(token !== "token123"){
        return <Navigate to = "/login"/>
    }

    return (
    <>
    <Navbar/>
        <div>
            <Outlet/>
        </div>
    
    </>
    )

}

export default RutaProtegida