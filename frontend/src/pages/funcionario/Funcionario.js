import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { NavigationBar } from "./NavBar";
import Perfil from "./Perfil";
import Iniciativa from "../Iniciativa";
import Iniciativas from "../Iniciativas";

export default function Funcionario() {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Fragment>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/perfil" elements={<Perfil />} />
            <Route exact path="/iniciativa" element={<Iniciativa nombre />} />
            <Route exact path="/iniciativas" element={<Iniciativas />} />
          </Fragment>
        </Routes>
      </BrowserRouter>
    </>
  );
}
