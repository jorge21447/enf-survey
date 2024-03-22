import { createContext, useState } from "react";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const hola = "hola humndo";
  const token = localStorage.getItem("AUTH_TOKEN");
  const [modalUser, setModalUser] = useState(false);

  // Funcione para cambiar el valor de los modal
  const changeStateModalUser = () => {
    setModalUser(!modalUser);
  };

  const filterUser = () => {
    console.log("Filter");
  };

  // CONSULTAS PARA LOS USUARIOS

  const createUser = async (datos, setErrores) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(`/api/users/`, datos, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      changeStateModalUser();
      return true;
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
    }
  };

  const editUser = async (datos, setErrores) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await clienteAxios.post(`/api/users/${datos.get('id')}`, datos, {
        headers: {
          "Content-type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
      });
      toast.success(`${data?.message}`, {
        position: "top-right",
      });
      return true
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error?.response?.data?.errors));
    }
  };

  const deleteUser = async (name, id) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar al usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1242bf",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await clienteAxios.delete(`/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire({
            title: "¡Usuario eliminado!",
            text: data?.message,
            icon: "success",
          });
          toast.success(`${data?.message}`, {
            position: "top-right",
          });
        } catch (error) {
          Swal.fire({
            title: "¡Error al eliminar el usuario!",
            text: error,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <SurveyContext.Provider
      value={{
        hola,
        deleteUser,
        createUser,
        editUser,
        filterUser,
        modalUser,
        changeStateModalUser,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyProvider };

export default SurveyContext;
