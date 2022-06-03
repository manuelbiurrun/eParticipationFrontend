import React from "react";
import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { Form, Button } from "react-bootstrap";

const Styles = styled.div`
#page-container {
    padding-top: 50%;
    background-image: url("https://thumbs.dreamstime.com/b/hablando-con-la-gente-grupo-de-caricaturistas-coloridas-burbujas-palabras-ilustraci%C3%B3n-del-vector-200696176.jpg");
    filter: blur(6px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: -50%;
    overflow: hidden;
  }
  h3 {
    margin-bottom: 20px;
    text-align: center;
  }
.form-alta {

    position: absolute;
    left: 50%;
    top 45%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 400px;
    background: white;
    padding: 30px;
    margin: auto;
    border-radius: 10px;
    box-shadow: 7px 13px 37px #000;
  
  }
  #procesoButton {
    width: 100%;
    color: white;
    background-color: #0c19cf;
    border: none;
    padding: 15px;
    margin-top: 15px;
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(232, 113, 33, 0.25);
      background-color: #0c19cf;
    }
    &:hover {
      background-color: #737cfa;
    }
    &:active {
      background-color: #0c19cf;
    }

  }
`;

function CrearProceso() {
  return (
    <Styles>
      <Layout>
        <div id="page-container"></div>
        <section className="form-alta">
          <Form>
            <h3>Elija una forma de recoleccion de datos</h3>
            <Button id="procesoButton" href="/crearprocesovotacion">
              VOTACION
            </Button>
            <Button id="procesoButton" href="/crearprocesoencuesta">
              ENCUESTA
            </Button>
          </Form>
        </section>
      </Layout>
    </Styles>
  );
}

export default CrearProceso;
