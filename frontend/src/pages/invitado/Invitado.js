import React, { Fragment } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./NavBar";
import Home from "./Home";
import { Footer } from "../../components/Footer";
import Iniciativa from "../Iniciativa";
import Login from "../Login";
import Iniciativas from "../Iniciativas";

const Styles = styled.div`
  #page-container {
    position: relative;
    min-height: calc(100vh - 3.5rem);
    padding-bottom: 0rem; //doble footer
  }
`;

function Principal() {
  return (
    <Styles>
      <div id="page-container">
        <>
          <NavigationBar />
          <BrowserRouter>
            <Routes>
              <Fragment>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/iniciativa" element={<Iniciativa />} />
                <Route exact path="/iniciativas" element={<Iniciativas />} />
              </Fragment>
            </Routes>
          </BrowserRouter>
        </>
        <Footer />
      </div>
    </Styles>
  );
}

export default Principal;
