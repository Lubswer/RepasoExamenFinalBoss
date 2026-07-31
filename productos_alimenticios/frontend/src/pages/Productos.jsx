import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Table from "../components/Table";
import "react-toastify/dist/ReactToastify.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [carga, setCarga] = useState(true);

  const obtnerProdutos = async () => {
    try {
      const token = localStorage.getItem("token");

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(
        `${backendUrl}/producto/listar?token=${token}`,
      );
      setProductos(res.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error al cargar los productos");
    } finally {
      setCarga(false);
    }
  };

  useEffect(() => {
    obtnerProdutos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer autoClose={2000} />
      <h1>Panel de Productos</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {carga ? (
          <p>Cargando los Productos...</p>
        ) : productos.length === 0 ? (
          <p>Sin productos registrados</p>
        ) : (
          <Table
            columnas={[
              "Nombre del producto",
              "Precio",
              "Categoria",
              "Stock",
              "Código",
            ]}
            datos={productos}
            renderFila={(pr) => (
              <>
                <td>{pr.nombre}</td>
                <td>{pr.precio}</td>
                <td>{pr.categoria}</td>
                <td>{pr.stock}</td>
                <td>{pr.codigo}</td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Productos;
