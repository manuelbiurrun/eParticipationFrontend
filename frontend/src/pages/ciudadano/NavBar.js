import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styled from "styled-components";
import { FaConnectdevelop } from "react-icons/fa";
//import { clearState, fetchUserID } from "../../services/Requests";
import { clearState } from "../../services/Requests";

const Styles = styled.div`
  #container {
    margin-bottom: 56px; //tamaño del navbar
  }

  .navbar {
    background-color: #1f618d;
    .logo {
      margin-left: 25px;
    }
    .items {
      margin-left: auto;
      font-weight: bold;
    }
  }

  .navbar-collapse {
    margin-left: 25px;
  }

  .navbar-toggler {
    margin-right: 20px;
  }

  .navbar-brand,
  .navbar-nav .nav-link {
    color: white;

    &hover: {
      color: black;
    }
  }

  .dropdown-menu-color {
    background-color: rgb(115, 124, 250);
    a {
      font-color: white;

      &:hover {
        background-color: #ffffff;
      }
    }
  }
`;

export const NavigationBar = () => {
  //const user = fetchUserID();
  const user = "colo@gmail";
  return (
    <Styles>
      <div id="container">
        <Navbar expand="lg" className="navbar fixed-top">
          <Navbar.Brand className="logo" href="/">
            <div href="/">
              <FaConnectdevelop fontSize="2rem" /> e-Participacion
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="items">
              <NavDropdown
                align="end"
                title="Estas Aburrido?"
                menuVariant="color"
              >
                <NavDropdown.Item href="/perfil">perfil</NavDropdown.Item>
                <NavDropdown.Item href={"/crearIniciativa?ciudadano=" + user}>
                  Nueva Iniciativa
                </NavDropdown.Item>
                <NavDropdown.Item href="/iniciativas">
                  Ver iniciativas
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    clearState();
                    window.location.replace("/");
                  }}
                >
                  Cerrar sesión
                </NavDropdown.Item>
                <NavDropdown.Item href="/politicas">
                  politicas de privacidad
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </Styles>
  );
};
