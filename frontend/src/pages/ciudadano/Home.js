import React, { useEffect, useState } from "react";
//import { Layout } from "../../components/Layout";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import { NotiError, NotiBienvenida, Noti } from "../../components/Notification";
import { Button } from "react-bootstrap";
import {
  getIniciativas,
  getProcesos,
  getUsuario,
  ciudadanoSigueIniciativa,
  ciudadanoAdheridoIniciativa,
} from "../../services/Requests";
import {
  seguirAIniciativa,
  adherirAIniciativa,
  fetchUserID,
} from "../../services/Requests";

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

export default function Home() {
  const usuario = fetchUserID();
  const onSeguir = (idIniciativa) => {
    seguirAIniciativa(idIniciativa, usuario).then((res) => {
      if (res.status === 200) {
        Noti("Estas siguiendo a la iniciativa " + idIniciativa);
      } else {
        NotiError("hubo un error inesperado");
      }
    });
  };
  const onAdherirse = (idIniciativa) => {
    adherirAIniciativa(idIniciativa, usuario).then((res) => {
      if (res.status === 200) {
        Noti("Estas siguiendo a la iniciativa " + idIniciativa);
      } else {
        NotiError("hubo un error inesperado");
      }
    });
  };
  const onAnyButtonClick = () => {
    NotiBienvenida("faltan los botones de los procesos");
  };

  const [iniciativas, setIniciativas] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [ciudadano, setCiudadano] = useState({
    nombre: "",
    correo: "",
    fechaNac: "",
    domicilio: "",
    nacionalidad: "",
  });

  useEffect(() => {
    getIniciativas()
      .then((response) => {
        setIniciativas(response.data);
      })
      .catch((error) => {
        NotiError(error.response.data);
      });
    getProcesos()
      .then((response) => {
        setProcesos(response.data);
      })
      .catch((error) => {
        NotiError(error.response.data);
      });
    getUsuario(usuario)
      .then((response) => {
        setCiudadano(response.data);
      })
      .catch((error) => {
        NotiError(error.response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styles>
      <nav>
        <h1 align="center">Bienvenido {ciudadano.nombre}!!</h1>
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
              <Button
                id="botonSeguir"
                onClick={() => {
                  onSeguir(ini.nombre);
                }}
              >
                {ciudadanoSigueIniciativa(ini.nombre, ciudadano.correo)
                  ? "Dejar de seguir"
                  : "Seguir"}
              </Button>
              <Button
                id="adButton"
                onClick={() => {
                  onAdherirse(ini.nombre);
                }}
              >
                {ciudadanoAdheridoIniciativa(ini.nombre, ciudadano.correo)
                  ? "Adherido"
                  : "Adherirse"}
              </Button>
            </article>
          );
        })}
      </aside>
      <aside id="derecha">
        {procesos.map((procs) => {
          return (
            <article key={procs.nombre}>
              <figure>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/geeks-25.png"
                  alt="The Pulpit Rock"
                  width="160"
                  height="115"
                />
              </figure>
              <h6>{procs.fecha}</h6>
              <h1>{procs.nombre}</h1>
              <p>{procs.descripcion}</p>
              <Button
                onClick={() => {
                  onAnyButtonClick();
                }}
              >
                Ver mas
              </Button>
              <Button
                onClick={() => {
                  onAnyButtonClick();
                }}
              >
                Seguir
              </Button>
              <Button
                onClick={() => {
                  onAnyButtonClick();
                }}
              >
                Adherirme
              </Button>
            </article>
          );
        })}
      </aside>
      <Footer />
    </Styles>
  );
}
