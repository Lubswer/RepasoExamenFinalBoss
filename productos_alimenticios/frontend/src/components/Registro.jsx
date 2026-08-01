import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registro = ({ tipo, campos, campoTipo, campoPH, setRegistro, recargarLista   }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistro = async (dataForm) => {
    try {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");
      const url = `${import.meta.env.VITE_BACKEND_URL}/${tipo}/registro?token=${token}&id=${idUsuario}`;
      const res = await axios.post(url, dataForm);
      toast.info("Registro Exitoso")
      setTimeout(()=>{
      if(setRegistro) setRegistro(false)
      if(recargarLista) recargarLista()        
      },1500)
      

    } catch (error) {
      toast.error(error.response?.data?.msg);
    }
  };
  return (
    <div>
        <ToastContainer/>
      <h3>Registro {tipo}</h3>
      <form onSubmit={handleSubmit(handleRegistro)}>
        {campos.map((cam, index) => (
          <div key={index}>
            <input
              type={campoTipo[index]}
              placeholder={campoPH[index]}
              {...register(cam)}
            />
          </div>
        ))}
        <button type="submit">Registrar {tipo}</button>
        <button type = "button" onClick = {() => {setRegistro(false)}}>Cancelar </button>
      </form>
    </div>
  );
};

export default Registro;
