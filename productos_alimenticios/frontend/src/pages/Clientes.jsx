import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Table from "../components/Table";
import Formulario from "../components/Formulario";
import "react-toastify/dist/ReactToastify.css";
import Eliminar from "../components/Eliminar"

const Clientes = () => {
  const [cliente, setCliente] = useState([]);
  const [carga, setCarga] = useState(true);
  const [modal, setModal] = useState(false);
  const [clienteEditar, setClienteEditar] = useState(null);
  const abrirModalNuevo = () => {
    setClienteEditar(null)
    setModal(true)
  }
  const abrirModalEditar = (cli) =>{
    setClienteEditar(cli)
    setModal(true)
  }
  const obtenerClientes = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");
      const res = await axios.get(
        `${url}/clientes/listar?token=${token}&id=${idUsuario}`,
      );
      setCliente(res.data);
      toast.success(res.data.msg);
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
            abrirModalNuevo();
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
            renderFila={(cli) => cli.status === true ?(
              <>
                <td>
                  {cli.nombre} {cli.apellido}
                </td>
                <td>{cli.ciudad}</td>
                <td>{cli.email}</td>
                <td>{cli.cedula}</td>
                <td>
                  <Eliminar
                  tipo = "clientes"
                  id = {cli._id}
                  recargarLista = {obtenerClientes}
                  />
                </td>
                <td>
                  <button onClick={() => {abrirModalEditar(cli)}}>
                    Editar Cliente
                  </button>

                </td>
              </>
            ): <></>}
          />
        ) : (
          <p>No hay clientes registrados</p>
        )}
      </div>
      {modal && (
        <Formulario
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
          recargarLista={obtenerClientes}
          setModal = {setModal}
          datosEditar = {clienteEditar}
        />
      )}
    </div>
  );
};

export default Clientes;
