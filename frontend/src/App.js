import React, { useState } from "react";
import Ciudadano from "./pages/ciudadano/Ciudadano";
import Funcionario from "./pages/funcionario/Funcionario";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "./components/Loading";
import { toast } from "react-toastify";
//import LoginGubUy from "./pages/invitado/LoginGubUy";

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
          sessionStorage.removeItem("facebookLogin");
          const rol = response.data;
          setTipoUser(rol);
        })
        .catch((error) => {
          console.log(error.data);
          clearState();
        });
    } else {
      fetchUserData()
        .then((response) => {
          sessionStorage.removeItem("facebookLogin");
          console.log("llegue hasta aca gubUY!!");
          /* localStorage.setItem("userID", response.data.correo);
          setTipoUser(response.data.rol); */
        })
        .catch((error) => {console.log(error.data)});
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
