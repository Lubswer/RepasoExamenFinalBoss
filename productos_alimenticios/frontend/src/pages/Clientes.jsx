import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Clientes = () => {
  const [cliente, setCliente] = useState([]);
  const obtenerClientes = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");
      const res = await axios.get(
        `${url}/clientes/listar?token=${token}&id=${idUsuario}`,
      );
      console.log(res.data);
      setCliente(res.data);
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <h1>Clientes</h1>
      
        {cliente.length === 0 ? (
          <p>No hay clientes registrados</p>
        ) : (
          cliente.map((cli) => (
            <div key={cli._id} style={{ display: "flex" }}>
              <p>
                <strong>Nombre del Cliente: </strong>
                {cli.nombre}
                {cli.apellido}
              </p>
              <p>
                <strong>Ciudad: </strong>
                {cli.ciudad}
              </p>
              <p>
                <strong>Correo: </strong>
                {cli.email}
              </p>
              <p>
                <strong>Telefono: </strong>
                {cli.telefono}
              </p>
              <p>
                <strong>Cedula: </strong>
                {cli.cedula}
              </p>
            </div>
          ))
        )}
      
    </div>
  );
};

export default Clientes;
