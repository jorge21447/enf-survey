import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import { useEffect, useState } from "react";


const Users = () => {
  const [apiItems, setApiItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const { filterUser, deleteUser, notify } = useSurvey();

  const navigate = useNavigate();

  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/users", fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (!isLoading) {
      setApiItems(data.data);
      setFilteredItems(data.data);
    }
  }, [isLoading, data]);

  //if (isLoading) return <Cargando />

  const handleDelete = (name, id) => {
    deleteUser(name, id);
  };

  return (
    <>
      <UserTable users={data?.data} handleDelete={handleDelete} />
      
    </>
  );
};

export default Users;
