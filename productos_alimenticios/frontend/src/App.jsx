import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Productos from "./pages/Productos";
import RutaProtegida from "./pages/RutaProtegida";
import Pedido from "./pages/Pedidos";
import Clientes from "./pages/Clientes";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RutaProtegida />}>
          <Route path="/" element={<Navigate to="/productos" />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/clientes" element={<Clientes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
