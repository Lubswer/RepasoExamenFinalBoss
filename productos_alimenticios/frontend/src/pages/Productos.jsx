import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Table from "../components/Table";
import Formulario from "../components/Formulario"
import Eliminar from "../components/Eliminar"
import "react-toastify/dist/ReactToastify.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [carga, setCarga] = useState(true);
  const [modal, setModal] = useState(false)
  const [datosEditar, setDatosEditar] = useState(null)

  const registrarProducto = () => {
    setDatosEditar(null)
    setModal(true)
  }
  const editarProducto = (pr) => {
    setDatosEditar(pr)
    setModal(true)
    
  }

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
      <div>
        <button onClick={registrarProducto}>
          Registrar Producto
        </button>
      </div>
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
                <td>
                  <Eliminar
                  tipo = "producto"
                  id = {pr._id}
                  recargarLista = {obtnerProdutos}
                  />
                </td>
                <td>
                  <button onClick={() => {editarProducto(pr)}}>
                    Editar Producto
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
      {modal === true ?(
       
          <Formulario
          tipo = "producto"
          campos = {["nombre", "descripcion", "categoria", "precio", "stock", "proveedor"]}
          campoTipo = {["String", "String","String","String","String","String" ]}
          campoPH = {["nombre", "descripcion", "categoria", "precio", "stock", "proveedor"]}
          recargarLista = {obtnerProdutos}
          setModal = {setModal}
          datosEditar = {datosEditar}
          />
       
      ): <></>}
    </div>
  );
};

export default Productos;
