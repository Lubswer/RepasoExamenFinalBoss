import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginUser = async (dataForm) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/login`;

      const res = await axios.post(url, dataForm);

      localStorage.setItem("token", res.data.token || "token123");

      toast.success(`Bienvenido ${res.data.nombre} ...`);

      setTimeout(() => {
        navigate("/productos");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Credenciales incorrectas");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer autoClose={2000} />
      <h1> Página del login</h1>
      <h2>Iniciar sesion</h2>
      <form onSubmit={handleSubmit(loginUser)}>
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", {
            required: "Por favor ingrese su correo electrónico",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "Por favor ingrese la contraseña",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
