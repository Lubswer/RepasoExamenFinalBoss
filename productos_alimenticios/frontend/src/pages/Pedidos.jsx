import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios, { toFormData } from "axios";
import Table from "../components/Table";
import "react-toastify/dist/ReactToastify.css";

const Pedidos = () => {
  const [pedido, setPedido] = useState([]);
  const [cargando, setCargando] = useState(true);

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
      <h1>Pedidos</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {cargando ? (
          <p>Cargando pedidos...</p>
        ) : pedido.length === 0 ? (
          <p>Aun no existen pedidos</p>
        ) : (
          <Table
            columnas={[
              "Nombre de cliente",
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
              </>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Pedidos;
