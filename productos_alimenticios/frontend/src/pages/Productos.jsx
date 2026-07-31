import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);


  const obtnerProdutos = async() => {
    try {
      const token = localStorage.getItem("token");

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(`${backendUrl}/producto/listar?token=${token}`);
      setProductos(res.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error al cargar los productos");
    }
  };

  useEffect(() => {
    obtnerProdutos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
        <ToastContainer autoClose={2000}/>
      <h1>Panel de Productos</h1>
      {productos.length === 0 ? (<p>Sin productos registrados</p>):
      (<div>
        {productos.map((prod) => 
             (<div key = {prod._id} style = {{display : "grid"}}>
                <h3>{prod.nombre}</h3>
                <p><strong>Precio: </strong>{prod.precio}</p>
                <p><strong>Categoria: </strong>{prod.categoria}</p>
                <p><strong>Stock: </strong>{prod.stock}</p>
                <p><strong>Código: </strong>{prod.codigo}</p>
            </div>)
        )}
      </div>)}
    </div>
  );
};

export default Productos;
