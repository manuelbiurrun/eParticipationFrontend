import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { Form } from "react-bootstrap";
import ini from "../datosPrueba/iniciativa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter, BsWhatsapp } from "react-icons/bs";
import Comentario from "../components/Comentario";
import Modal, { ModalProvider } from "styled-react-modal";
//import { getIniciativa } from "../services/Requests";
//import { NotiError } from "../components/Notification";
import { NotiBienvenida, Noti } from "../components/Notification";
import { useSearchParams } from "react-router-dom";
import comentarios from "../datosPrueba/comentarios";
import ciudadano from "../datosPrueba/ciudadano";
//import { comentarIniciativa } from "../services/Requests";
//import { getToken } from "../services/Requests";

const StyledModal = Modal.styled`
  border-radius: 5px;
  padding: 1.5%;
  width: 25%;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow-y:inherit !important;

  .cuerpo{
    margin-bottom: 15px;
  }
  .abajo{
    text-align: right;
  }
  Button {
    margin-left: 5px;
  }
`;

const Styles = styled.div`
  #imagen {
    margin-top: 50px;
  }
  #invisible {
    padding-bottom: 35px;
  }
  h3 {
    margin-top: 50px;
  }
  Button {
    margin-bottom: 5px;
    margin-right: 20px;
  }
  #twitterButton {
    background-color: #1aa1d6;
  }
  #whatsappButton {
    background-color: #58c554;
  }
  #comentarButton {
    background-color: transparent;
    color: black;
    font-weight: bold;
    border-width: medium;
    float: right;
  }
  .comentarios {
    margin-top: 5px;
    margin-bottom: 10px;
    text-align: center;
  }
`;

export default function Iniciativa() {
  // const [ini, setIniciativa] = useState([]);

  // useEffect(() => {
  //   getIniciativa(sessionStorage.getItem("idIniciativa"))
  //     .then((response) => {
  //       setIniciativa(response.data);
  //     })
  //     .catch((error) => {
  //       NotiError(error.response.data);
  //     });
  // }, []);

  const [params] = useSearchParams();
  const nombre = params.get("nombre");
  const [isOpen, setIsOpen] = useState(false);
  //const [comment, setComment] = useState("");

  /* const toggleModal = () => {
    if (getToken() === null) {
      NotiError("debes estar logueado");
    } else {
      setIsOpen(!isOpen);
    }
  }; */

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const comentar = () => {
    //guardar comentario
    //comentarIniciativa(ini.nombre, ciudadano.correo, comment);
    setIsOpen(!isOpen);
  };

  const compartirTwitter = () => {
    NotiBienvenida("compartir Twitter");
  };

  const compartirFacebook = () => {
    NotiBienvenida("Compartir Facebook");
  };

  const compartirWpp = () => {
    navigator.clipboard.writeText(window.location.href);
    Noti("URL compiada con exito!!");
  };

  const handleCommentChange = (e) => {
    //setComment(e.target.value);
    console.log("falta la funcion");
  };

  return (
    <Styles>
      <Layout>
        <header>{ini.fecha}</header>
        <nav align="center">
          <h1>{nombre}</h1>
        </nav>
        <p align="center">{ini.descripcion}</p>
        <figure id="imagen" align="center">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/geeks-25.png"
            alt="imagen"
            width="160"
            height="115"
          />
        </figure>
        <div>
          <h6>Compartir:</h6>
          <Button onClick={compartirTwitter} id="twitterButton">
            <BsTwitter />
          </Button>
          <Button onClick={compartirFacebook}>
            <FaFacebook />
          </Button>
          <Button onClick={compartirWpp} id="whatsappButton">
            <BsWhatsapp />
          </Button>
          <Button
            id="comentarButton"
            onClick={() => {
              toggleModal();
            }}
          >
            Comentar
          </Button>
        </div>
        <div className="comentarios">
          {comentarios.map((com) => {
            return <Comentario key={com.id} data={com} />;
          })}
        </div>
      </Layout>
      <ModalProvider>
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <h4>Comentario en {nombre}</h4>
          <hr />
          <div className="cuerpo">
            <h6>{ciudadano.correo}</h6>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Comentario:</Form.Label>
            <Form.Control
              onChange={handleCommentChange}
              as="textarea"
              rows={5}
            />
          </Form.Group>
          <div className="abajo">
            <Button onClick={comentar}>Comentar</Button>
          </div>
        </StyledModal>
      </ModalProvider>
      <div>
        <p id="invisible"></p>
      </div>
      <Footer />
    </Styles>
  );
}
