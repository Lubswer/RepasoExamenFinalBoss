import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";

const Formulario = ({
  campos,
  campoTipo,
  campoPH,
  setModal,
  funcionRecargar,
  dataEditar,
  tipo,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (dataEditar) {
      reset(dataEditar);
    } else {
      reset({});
    }
  }, [dataEditar, reset]);

  const handleFormulario = async (dataForm) => {
    try {
      let res;
      if (dataEditar) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/${tipo}/${dataEditar.id}`;
        res = await axios.put(url, dataForm);
      } else {
        const url = `${import.meta.env.VITE_BACKEND_URL}/${tipo}`;
        res = await axios.post(url, dataForm);
      }
      toast.info("Operación Exitosa");
      setTimeout(() => {
        funcionRecargar();
        setModal(false);
      }, 1200);
    } catch (error) {
      console.error(error);
      toast.error("Ocurrio un error");
    }
  };
  const validarEntradas = (input, tipo) => {
    if (tipo === "email") {
      if (!input.includes(".")) {
        return "El email debe llevar punto";
      }
      
    }
    if (tipo === "cedula") {
      if (isNaN(Number(input))) {
        return "Debe ingrese datos numéricos";
      }
    }
    if (tipo === "telefono") {
      if (isNaN(Number(input))) {
        return "Debe ingresar datos numéricos";
      }
    }
    return true;
  };
  return (
    <div className = "modalFormulario">
      <h3>Formulario {tipo}</h3>
      <form onSubmit={handleSubmit(handleFormulario)}>
        {campos.map((cam, index) => (
          <div key={index}>
            <input
              type={campoTipo[index]}
              placeholder={campoPH[index]}
              {...register(cam, {
                required: `El ${cam} es requerido`,
                validate: (input) => validarEntradas(input, cam),
              })}
            />
            {errors[cam] && <p>{errors[cam].message}</p>}
          </div>
        ))}
        <div>
          <button type="submit">Aceptar</button>
          <button
            type="button"
            onClick={() => {
              setModal(false);
            }}
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};
export default Formulario;
