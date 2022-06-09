import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { NavigationBar } from "./NavBar";
import Perfil from "./Perfil";
import Iniciativa from "../Iniciativa";
import Iniciativas from "./Iniciativas";
import CrearProceso from "./CrearProceso";
import CrearProcesoEncuesta from "./CrearProcesoEncuesta";
import CrearProcesoVotacion from "./CrearProcesoVotacion";
import LogoutGubUy from "../LogoutGubUy";
import ModificarIniciativa from "./ModificarIniciativa";
import Proceso from "../Proceso";
import Procesos from "./Procesos";
import Probando from "./Probando";

export default function Funcionario() {
  localStorage.setItem("userRole", "FUNCIONARIO");
  localStorage.setItem("userID", "pepe@gmail");
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Fragment>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/perfil" element={<Perfil />} />
            <Route exact path="/iniciativa" element={<Iniciativa />} />
            <Route exact path="/proceso" element={<Proceso />} />
            <Route exact path="/procesos" element={<Procesos />} />
            <Route exact path="/iniciativas" element={<Iniciativas />} />
            <Route exact path="/crearproceso" element={<CrearProceso />} />
            <Route
              exact
              path="/crearprocesovotacion"
              element={<CrearProcesoVotacion />}
            />
            <Route
              exact
              path="/modificariniciativa"
              element={<ModificarIniciativa />}
            />
            <Route
              exact
              path="/crearprocesoencuesta"
              element={<CrearProcesoEncuesta />}
            />
            <Route exact path="/probando" element={<Probando />} />
            <Route exact path="/logout" element={<LogoutGubUy />} />
          </Fragment>
        </Routes>
      </BrowserRouter>
    </>
  );
}
