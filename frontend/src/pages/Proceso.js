import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { Form } from "react-bootstrap";
import { fetchUserRole } from "../services/Requests";
import Comentario from "../components/Comentario";
import Modal, { ModalProvider } from "styled-react-modal";
import { getProceso, fetchUserID } from "../services/Requests";
import { Noti, NotiError } from "../components/Notification";
import { useSearchParams } from "react-router-dom";
import comentarios from "../datosPrueba/comentarios";
import ciudadano from "../datosPrueba/ciudadano";
import { TwitterShareButton} from 'react-twitter-embed';
//import { comentarIniciativa } from "../services/Requests";

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
  #copyButton {
    background-color: #a0a3a8;
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

export default function Proceso() {
  const [params] = useSearchParams();
  const nombre = params.get("nombre");
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [opciones] = useState([]);
  const [pregunta, setPregunta] = useState("");

  const [proc, setProceso] = useState({
    nombre: "",
    fecha: "",
    instrumento: "",
    contenidoInstrumento: [],
    alcance: "",
    fase: "",
  });

  const sacarPregunta = (res) => {
    const p = res.contenidoInstrumento[res.contenidoInstrumento.length - 1];
    setPregunta(p);
  }

  const obtenerOpcion = (content) => {
    const array = content.split(",");//array[0] es la option y array[1] es el votes
    const valueOption = array[0].split(":")[1];
    const valueVotes = array[1].split(":")[1];
    return {"option": valueOption, "votes": valueVotes};   
  }

  const sacarOpciones = (res) => {
    const contenido = res.contenidoInstrumento;
    for(let i = 0; i < contenido.length-1; i++) {
      const opcion = obtenerOpcion(contenido[i]);
      opciones.push(opcion);
    }
    sacarPregunta(res);
  }

  useEffect(() => {
    getProceso(nombre)
      .then((response) => {
        if(opciones.length === 0) {
          sacarOpciones(response.data);
        }
        setProceso(response.data);
      })
      .catch((error) => {
        NotiError(error.data);
      });
  }, []);

  const toggleModal = () => {
    if (fetchUserID() === "") {
      NotiError("debes estar logueado");
    } else {
      setIsOpen(!isOpen);
    }
  };

  const comentar = () => {
    //comentarIniciativa(ini.nombre, ciudadano.correo, comment);
    console.log(comment);
    setIsOpen(!isOpen);
    Noti("comentario relizado con exito!!");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    //console.log("falta la funcion");
  };

  return (
    <Styles>
      <Layout>
        <header>{proc.fecha}</header>
        <nav align="center">
          <h1>{nombre}</h1>
        </nav>
        <h3 align="center">{pregunta}</h3>
        {opciones.map((op, index) => {
          return(
            <div key={index}>
              <h6 align="center">{op.option} | {op.votes}</h6>
            </div>
          );
        })}
        <div>
          <h6>Compartir:</h6>
          <TwitterShareButton />
          {fetchUserRole() === "CIUDADANO" ? (
            <Button
              id="comentarButton"
              onClick={() => {
                toggleModal();
              }}
            >
              Comentar
            </Button>
          ) : null}
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
