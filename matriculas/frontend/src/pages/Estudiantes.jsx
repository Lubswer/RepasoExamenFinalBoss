import {useEffect, useState} from "react"
import axios from "axios"
import Table from "../components/Table.jsx"
import {toast} from "react-toastify"
import Eliminar from "../components/Eliminar.jsx"
import Formulario from "../components/Formulario.jsx"

const Estudiantes = () => {
    const [data, setData] = useState()
    const [cargando, setCargando] = useState(false)
    const [modal, setModal] = useState(false)
    const [editar, setEditar] = useState(null)
    const handleCrear= ()=> {
        setEditar(null)
        setModal(true)
    }
    const handleEditar = (dataEditar) =>{
        setEditar(dataEditar)
        setModal(true)
    }
    const cargarRegistros = async() =>{
        try{
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante`
            const res = await axios.get(url)
            setData(res.data)
            setCargando(true)
        }catch(error){
            toast.error(error.response?.data?.msg)
        }
    }
    useEffect(()=>{
        cargarRegistros()
    }, [])
    return(<div>
        <h1>Estudiantes</h1>
        <div>
            <button className= "crearBTN" onClick = {handleCrear}>Crear Nuevo</button>
        </div>
        <div>
            {cargando === false ? <p>Cargando Estudiantes</p>:
            <>
            <Table
            campos = {["nombre","apellido","cedula","fecha de nacimiento","ciudad","dirección", "telefono", "email"]}
            data = {data}
            funcionRender = {(d)=>(
                <>
                <td>{d.nombre}</td>
                <td>{d.apellido}</td>
                <td>{d.cedula}</td>
                <td>{d.fecha_nacimiento}</td>
                <td>{d.ciudad}</td>
                <td>{d.direccion}</td>
                <td>{d.telefono}</td>
                <td>{d.email}</td>  
                <td style = {{border: "none"}}>
                {<Eliminar
                rg = {d}
                tipo = "estudiante"
                funcionRecargar = {cargarRegistros}
                />}
                </td> 
                <td style = {{border: "none"}}>
                {<button className="editarBTN" onClick = {() => {handleEditar(d)}}>
                    Editar
                </button>}   
                </td>          
                </>

            )}
            />
            </>
            }
        </div>
        {modal === true ? 
        <>
        <Formulario
        campos = {["nombre","apellido","cedula","fecha_nacimiento","ciudad","dirección", "telefono", "email"]}
        campoTipo = {["String", "String", "String", "Date", "String", "String", "String", "email"]}
        campoPH = {["Ingrese el nombre","Ingrese el apellido","Ingrese la cedula","Ingrese la fecha de nacimiento","Ingrese la ciudad","Ingrese la dirección", "Ingrese el telefono", "Ingrese el email"]}
        setModal = {setModal}
        funcionRecargar = {cargarRegistros}
        dataEditar = {editar}
        tipo = "estudiante"
        />
        </>: <p>Modal Inactive</p>}
    </div>)
}
export default Estudiantes