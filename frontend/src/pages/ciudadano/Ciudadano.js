import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { NavigationBar } from "./NavBar";
import Perfil from "./Perfil";
import CrearIniciativa from "./CrearIniciativa";
import Iniciativa from "../Iniciativa";
import Politicas from "./Politicas";
import Iniciativas from "../Iniciativas";
import ModificarIniciativa from "./ModificarIniciativa";

export default function Ciudadano() {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Fragment>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/perfil" element={<Perfil />} />
            <Route
              exact
              path="/creariniciativa"
              element={<CrearIniciativa />}
            />
            <Route exact path="/iniciativa" element={<Iniciativa />} />
            <Route exact path="/iniciativas" element={<Iniciativas />} />
            <Route exact path="/politicas" element={<Politicas />} />
            <Route
              exact
              path="/modificariniciativa"
              element={<ModificarIniciativa />}
            />
          </Fragment>
        </Routes>
      </BrowserRouter>
    </>
  );
}
