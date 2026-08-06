import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import Login from "./pages/Login.jsx"
import RutaProtegida from "./pages/RutaProtegida.jsx"
import Estudiantes from "./pages/Estudiantes.jsx"
import Materias from "./pages/Materias.jsx"
import Matriculas from "./pages/Matriculas.jsx"

const App = ()=>{
  return(
  <BrowserRouter>
  <ToastContainer/>
  <Routes>
    <Route path = "/" element= {<Navigate to = "/usuarios"/>}/>
    <Route path = "/usuarios" element = {<Login/>}/>
    <Route element = {<RutaProtegida/>}>
    <Route path = "/estudiante" element = {<Estudiantes/>}/>
    <Route path = "/materia" element = {<Materias/>}/>
    <Route path = "/matricula" element = {<Matriculas/>}/>
    </Route>
  </Routes>

  </BrowserRouter>
  )

}

export default App