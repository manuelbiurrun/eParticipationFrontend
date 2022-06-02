import React, { useState } from "react";
import Ciudadano from "./pages/ciudadano/Ciudadano";
import Funcionario from "./pages/funcionario/Funcionario";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "./components/Loading";
import { toast } from "react-toastify";
import {
  getToken,
  fetchUserRole,
  clearState,
  fetchUserData,
} from "./services/Requests";
import Invitado from "./pages/invitado/Invitado";

toast.configure();
export default function App() {
  const [tipoUser, setTipoUser] = useState("");
  if (getToken() !== null) {
    if (sessionStorage.getItem("facebookLogin") === true) {
      fetchUserRole()
        .then((response) => {
          console.log("llegue hasta aca facebook!!");
          /*const rol = fetchUserRole();
          setTipoUser(rol);*/
        })
        .catch((error) => {
          clearState();
        });
    } else {
      fetchUserData()
        .then((response) => {
          console.log("llegue hasta aca gubUY!!");
          /*localStorage.setItem("userID", response.data.correo);
          setTipoUser(response.data.rol);*/
        })
        .catch((error) => {});
    }
  } else if (tipoUser === "") {
    setTipoUser("INVITADO");
  }
  switch (tipoUser) {
    case "CIUDADANO":
      return <Ciudadano />;
    case "FUNCIONARIO":
      return <Funcionario />;
    case "INVITADO":
      return <Invitado />;
    default:
      return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Loading />} />
          </Routes>
        </BrowserRouter>
      );
  }
}
