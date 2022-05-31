//import React, { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import { Button } from "react-bootstrap";
/* import { NotiBienvenida, NotiError } from "../../components/Notification";
import { getIniciativas, getProcesos } from "../../services/Requests"; */
import { NotiBienvenida } from "../../components/Notification";
import iniciativas from "../../datosPrueba/iniciativas";
import procesos from "../../datosPrueba/procesos";

const Styles = styled.div`
  h1 {
    padding-top: 15px;
  }
  #izquierda {
    width: 45%;
    float: left;
    color: black;
    padding: 15px;
    margin-top: 10px;
    margin-left: 30px;
    height: 45rem;
    border-radius: 10px;
    overflow: scroll;
    border-style: solid;
  }
  #izquierda::-webkit-scrollbar {
    display: none;
  }
  #derecha {
    width: 45%;
    float: right;
    color: black;
    padding: 15px;
    margin-top: 10px;
    margin-right: 30px;
    height: 45rem;
    border-radius: 10px;
    overflow: scroll;
    border-style: solid;
  }
  #derecha::-webkit-scrollbar {
    display: none;
  }
  article {
    width: 100%;
    padding: 10px;
    float: left;
    background-color: white;
    margin-bottom: 20px;
    margin-top: 10px;
    border-radius: 10px;
  }
  Button {
    float: right;
    margin-left: 10px;
  }
  figure {
    float: right;
  }
`;

function PaginaPrincipal() {
  /* const [iniciativas, setIniciativas] = useState([]);
  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
    getIniciativas()
      .then((response) => {
        const inis = response.data.slice(0, 5);
        setIniciativas(inis);
      })
      .catch((error) => {
        NotiError(error.response.data);
      });
    getProcesos()
      .then((response) => {
        const procs = response.data.slice(0, 5);
        setProcesos(procs);
      })
      .catch((error) => {
        NotiError(error.response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  const onVerMas = () => {
    NotiBienvenida("...esto no anda!");
  };

  return (
    <Styles>
      <nav>
        <h1 align="center">Bienvenido!!</h1>
      </nav>
      <aside id="izquierda">
        {iniciativas.map((ini) => {
          return (
            <article key={ini.nombre}>
              <figure>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/geeks-25.png"
                  alt="The Pulpit Rock"
                  width="160"
                  height="115"
                />
              </figure>
              <h6>{ini.fecha}</h6>
              <h1>{ini.nombre}</h1>
              <p>{ini.descripcion}</p>
              <Button href={"/iniciativa?nombre=" + ini.nombre}>Ver mas</Button>
            </article>
          );
        })}
        <Button variant="danger" href="/iniciativas">
          Ver mas iniciativas
        </Button>
      </aside>
      <aside id="derecha">
        {procesos.map((proc) => {
          return (
            <article key={proc.nombre}>
              <figure>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/geeks-25.png"
                  alt="The Pulpit Rock"
                  width="160"
                  height="115"
                />
              </figure>
              <h6>{proc.fecha}</h6>
              <h1>{proc.nombre}</h1>
              <p>{proc.descripcion}</p>
              <Button
                onClick={() => {
                  onVerMas();
                }}
              >
                Ver mas
              </Button>
            </article>
          );
        })}
      </aside>
      <Footer />
    </Styles>
  );
}

export default PaginaPrincipal;
