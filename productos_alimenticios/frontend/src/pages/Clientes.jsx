import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Table from "../components/Table";
import "react-toastify/dist/ReactToastify.css";

const Clientes = () => {
  const [cliente, setCliente] = useState([]);
  const [carga, setCarga] = useState(true)
  const obtenerClientes = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");
      const res = await axios.get(
        `${url}/clientes/listar?token=${token}&id=${idUsuario}`,
      );
      setCliente(res.data);
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }finally{
      setCarga(false)
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <h1>Clientes</h1>
<div style={{ display: "flex", justifyContent: "center" }}>
      {carga === true ? (<p>Cargando clientes...</p> ):cliente.length !== 0 ? (
        
          <Table
            columnas={["Nombre del cliente", "Ciudad", "Correo Electrónico", "Cedula"]}
            datos={cliente}
            renderFila={(cli) => (
              <>
                <td>{cli.nombre} {cli.apellido}</td>
                <td>{cli.ciudad}</td>
                <td>{cli.email}</td>
                <td>{cli.cedula}</td>
              </>
            )}
          />
        
      ) : (
        <p>No hay clientes registrados</p>
      )}
      </div>
    </div>
  );
};

export default Clientes;
