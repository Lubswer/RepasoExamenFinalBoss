import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios, { toFormData } from "axios";
import Table from "../components/Table";
import Formulario from "../components/Formulario";
import Eliminar from "../components/Eliminar"
import "react-toastify/dist/ReactToastify.css";


const Pedidos = () => {
  const [pedido, setPedido] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modal, setModal] = useState(false)
  const [editarPedido, setEditarPedido] = useState(null)

  const nuevoPedido = () => {
    setEditarPedido(null)
    setModal(true)
  }

  const pedidoEditar = (pd) => {
    setEditarPedido(pd)
    setModal(true)
  }

  const pedidosObtener = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/pedido/listar?token=${token}`,
      );
      setPedido(res.data);
    } catch (error) {
      toast.error(error.response?.data?.msg);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    pedidosObtener();
  }, []);

  return (
    <div>
      <ToastContainer/>
      <h1>Pedidos</h1>
      <div >
        <button onClick= {nuevoPedido}>
          Crear Pedido
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {cargando ? (
          <p>Cargando pedidos...</p>
        ) : pedido.length === 0 ? (
          <p>Aun no existen pedidos</p>
        ) : (
          <Table
            columnas={[
              "Nombre del Cliente",
              "Correo Electrónico",
              "Producto",
              "Stock",
              "Precio",
              "Descripción",
            ]}
            datos={pedido}
            renderFila={(pd) => (
              <>
                <td>{pd.cliente.nombre } {pd.cliente.apellido}</td>
                <td>{pd.cliente.email}</td>
                <td>{pd.producto.nombre}</td>
                <td>{pd.producto.stock}</td>
                <td>{pd.producto.precio}</td>
                <td>{pd.descripcion}</td>
                <td>
                  <Eliminar
                  tipo = "pedido"
                  id = {pd._id}
                  recargarLista = {pedidosObtener}
                  />
                </td>
                <td>
                  <button onClick={() =>{pedidoEditar(pd)}}>
                    Actualizar
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
      {modal === true && editarPedido === null? <Formulario
      tipo = "pedido"
      campos = {["descripcion", "idCliente", "idProducto"]}
      campoTipo = {["String", "String", "String"]}
      campoPH = { ["Descripcion para le pedido", "ID del Cliente" , "ID del Producto"]}
      recargarLista = {pedidosObtener}
      setModal = {setModal}
      datosEditar = {editarPedido}
      />:<></> }
      {modal === true && editarPedido !== null? <Formulario
      tipo = "pedido"
      campos = {["descripcion"]}
      campoTipo = {["String"]}
      campoPH = { ["Descripcion para le pedido"]}
      recargarLista = {pedidosObtener}
      setModal = {setModal}
      datosEditar = {editarPedido}
      />:<></> }
    </div>
  );
};

export default Pedidos;
