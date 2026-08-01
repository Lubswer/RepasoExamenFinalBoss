import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Table from "../components/Table";
import Registro from "../components/Registro";
import "react-toastify/dist/ReactToastify.css";

const Clientes = () => {
  const [cliente, setCliente] = useState([]);
  const [carga, setCarga] = useState(true);
  const [registro, setRegistro] = useState(false);
  const obtenerClientes = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");
      const res = await axios.get(
        `${url}/clientes/listar?token=${token}&id=${idUsuario}`,
      );
      setCliente(res.data);
      toast.succes(res.data.msg);
    } catch (error) {
      const mensaje = error.response?.data?.msg;
      toast.error(mensaje);
    } finally {
      setCarga(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <h1>Clientes</h1>
      <div style={{ display: "row", justifyContent: "left" }}>
        <button
          onClick={() => {
            setRegistro(true);
          }}
        >
          Registrar cliente
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {carga === true ? (
          <p>Cargando clientes...</p>
        ) : cliente.length !== 0 ? (
          <Table
            columnas={[
              "Nombre del cliente",
              "Ciudad",
              "Correo Electrónico",
              "Cedula",
            ]}
            datos={cliente}
            renderFila={(cli) => (
              <>
                <td>
                  {cli.nombre} {cli.apellido}
                </td>
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
      {registro && (
        <Registro
          tipo="clientes"
          campos={[
            "nombre",
            "apellido",
            "ciudad",
            "email",
            "direccion",
            "telefono",
            "cedula",
            "fecha_nacimiento",
          ]}
          campoTipo={[
            "text",
            "text",
            "text",
            "email",
            "text",
            "text",
            "text",
            "date",
          ]}
          campoPH={[
            "Nombre",
            "Apellido",
            "Ciudad",
            "Correo",
            "Dirección",
            "Teléfono",
            "Cédula",
            "Fecha Nacimiento",
          ]}
          setRegistro={setRegistro}
          recargarLista={obtenerClientes}
        />
      )}
    </div>
  );
};

export default Clientes;
