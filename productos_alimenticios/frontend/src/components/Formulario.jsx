import { useForm } from "react-hook-form";
import { useEffect, useEffectEvent } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Formulario = ({ tipo, campos, campoTipo, campoPH, recargarLista, setModal, datosEditar   }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect (() => {
    if(datosEditar){
      reset(datosEditar)
    }else {
      reset({})
    }
  }, [datosEditar, reset])
  const handleFormulario = async (dataForm) => {
    try {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");
      let res
      if(datosEditar){
      const url = `${import.meta.env.VITE_BACKEND_URL}/${tipo}/actualizar?token=${token}&idCliente=${datosEditar._id}`;
      res = await axios.patch(url, dataForm);
      }else{
      const url = `${import.meta.env.VITE_BACKEND_URL}/${tipo}/registro?token=${token}&id=${idUsuario}`;
      res = await axios.post(url, dataForm);
      }

      toast.info("Registro Exitoso")
      setTimeout(()=>{
      if(setModal) setModal(false)
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
      <form onSubmit={handleSubmit(handleFormulario)}>
        {campos.map((cam, index) => (
          <div key={index}>
            <input
              type={campoTipo[index]}
              placeholder={campoPH[index]}
              {...register(cam)}
            />
          </div>
        ))}
        <button type="submit">Aceptar</button>
        <button type = "button" onClick = {() => {setModal(false)}}>Cancelar </button>
      </form>
    </div>
  );
};

export default Formulario;
