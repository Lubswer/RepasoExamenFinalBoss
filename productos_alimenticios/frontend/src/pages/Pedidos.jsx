import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Pedidos = () => {
  const [pedido, setPedido] = useState([]);

  const pedidosObtener = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/pedido/listar?token=${token}`,
      );
      setPedido(res.data);
    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
  };

  useEffect(() => {
    pedidosObtener();
  }, []);

  return (
    <div>
      <h1>Pedidos</h1>

      {pedido.length === 0 ? (
        <p>Aun no existen pedidos</p>
      ) : (
        pedido.map((ped) => (
          <div key={ped._id} style={{display : "flex"}}>
            <p>
              <strong>Nombre del cliente: </strong> {ped.cliente.nombre}
            </p>
            <p>
              <strong>Nombre del producto: </strong>
              {ped.producto.nombre}
            </p>
            <p>
              <strong>Stock actual del producto: </strong>
              {ped.producto.stock}
            </p>
            <p>
              <strong>Precio del producto: </strong>
              {ped.producto.precio}
            </p>
            <p>
              <strong>Descripción del pedido: </strong>
              {ped.descripcion}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Pedidos;
