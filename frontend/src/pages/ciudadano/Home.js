import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import { NotiError, Noti } from "../../components/Notification";
import { Button } from "react-bootstrap";
import Modal, { ModalProvider } from "styled-react-modal";
import Poll from "@gidesan/react-polls";
import {
  getIniciativas,
  getProcesos,
  getUsuario,
  ciudadanoSigueIniciativa,
  ciudadanoAdheridoIniciativa,
  dejarSeguirAIniciativa,
  //participarProceso,
  ciudadanoParticipoProceso,
  //eleccionProcesoCiudadano,
} from "../../services/Requests";
import {
  seguirAIniciativa,
  adherirAIniciativa,
  fetchUserID,
} from "../../services/Requests";

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
  #todasButton {
    float: right;
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
  const [unfollowOpen, isUnfollowOpen] = useState();
  const [participarOpen, isParticiparOpen] = useState();
  const [iniciativa, setIniciativa] = useState();
  const [pregunta, setPregunta] = useState();
  const [opciones, setOpciones] = useState([]);
  const [proceso, setProceso] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    fecha: "",
    estado: "",
    instrumento: "",
    contenidoInstrumento: [],
  });

  const unfollow = () => {
    isUnfollowOpen(!unfollowOpen);
  };

  const participar = () => {
    isParticiparOpen(!participarOpen);
  };

  const onUnfollow = (ini) => {
    dejarSeguirAIniciativa(ini, usuario).then((res) => {console.log(res)});
  };

  const onParticipar = (opcion) => {
    //participarProceso(proceso, usuario, option);
    const newAnswers = proceso.opciones.map((answer) => {
      if (answer.option === opcion) {
        answer.votes++;
      }
      return answer;
    });
    setProceso((proceso) => ({
      ...proceso,
      opciones: newAnswers,
    }));
    //modificarProceso(proceso) --> para actualizar las votaciones
    console.log(proceso);
    console.log(opcion);
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

  const [iniciativas, setIniciativas] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [ciudadano, setCiudadano] = useState({
    nombre: "",
    correo: "",
    fechaNac: "",
    domicilio: "",
    nacionalidad: "",
  });

  const sacarPregunta = () => {
      const pregunta = proceso.contenidoInstrumento[proceso.contenidoInstrumento.length - 1];
      setPregunta(pregunta);
  }

  const obtenerOpcion = (content) => {
    const array = content.split(",");//array[0] es la option y array[1] es el votes
    const valueOption = array[0].split(":")[1];
    const valueVotes = array[1].split(":")[1];
    return {"option": valueOption, "votes": valueVotes};    
  }

  const sacarOpciones = () => {
    let jsonOpciones = [];
    const contenido = proceso.contenidoInstrumento;
    for(let i = 0; i < contenido.length-1; i++) {
      const opcion = obtenerOpcion(contenido[i]);
      jsonOpciones.push(opcion);
    }
    setOpciones(jsonOpciones);
    console.log(opciones);
  }

  useEffect(() => {
    getIniciativas()
      .then((response) => {
        setIniciativas(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        NotiError(error.response.data);
      });
    getProcesos()
      .then((response) => {
        setProcesos(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        NotiError(error.response.data);
      });
    getUsuario(usuario)
      .then((response) => {
        setCiudadano(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        NotiError(error.response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pollStyles1 = {
    questionSeparator: true,
    questionSeparatorWidth: "question",
    questionBold: true,
    questionColor: "#303030",
    align: "center",
    theme: "blue",
  };

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
              {ciudadanoSigueIniciativa(ini.nombre, ciudadano.correo) ? (
                <Button
                  id="botonSeguir"
                  onClick={() => {
                    setIniciativa(ini.nombre);
                    unfollow(ini.nombre);
                  }}
                >
                  Dejar de seguir
                </Button>
              ) : (
                <Button
                  id="botonSeguir"
                  onClick={() => {
                    onSeguir(ini.nombre);
                  }}
                >
                  Seguir
                </Button>
              )}
              <Button
                id="adButton"
                onClick={() => {
                  onAdherirse(ini.nombre);
                }}
                disabled={ciudadanoAdheridoIniciativa(
                  ini.nombre,
                  ciudadano.correo
                )}
              >
                {ciudadanoAdheridoIniciativa(ini.nombre, ciudadano.correo)
                  ? "Adherido"
                  : "Adherirse"}
              </Button>
            </article>
          );
        })}
        <Button id="todasButton" variant="danger" href="/iniciativas">
          Ver mas iniciativas
        </Button>
      </aside>
      <aside id="derecha">
        {procesos.map((proc) => {
          return (
            <article key={proc.id}>
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
              <Button href={"proceso?nombre=" + proc.nombre}>Ver mas</Button>
              <Button
                onClick={() => {
                  setProceso(proc);
                  sacarPregunta();
                  sacarOpciones();
                  participar();
                }}
              >
                Involucrarme
              </Button>
            </article>
          );
        })}
        <Button id="todasButton" variant="danger" href="/procesos">
          Ver mas procesos
        </Button>
      </aside>
      <ModalProvider>
        <StyledModal
          isOpen={unfollowOpen}
          onBackgroundClick={unfollow}
          onEscapeKeydown={unfollow}
        >
          <h4>Dejar de seguir {iniciativa}</h4>
          <hr />
          <div className="cuerpo">
            <h6>
              Seguro que quieres dejar de seguir la iniciativa {iniciativa}?
            </h6>
          </div>
          <div className="abajo">
            <Button variant="secondary" onClick={unfollow}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onUnfollow(iniciativa);
                unfollow();
              }}
            >
              Confirmar
            </Button>
          </div>
        </StyledModal>
        <StyledModal
          isOpen={participarOpen}
          onBackgroundClick={participar}
          onEscapeKeydown={participar}
        >
          <h4>Participar en {proceso.nombre}</h4>
          <hr />
          <div className="cuerpo">
            {ciudadanoParticipoProceso(proceso, usuario) ? (
              <Poll
                id="poll"
                question={pregunta}
                answers={opciones}
                onVote={onParticipar}
                customStyles={pollStyles1}
                noStorage
              />
            ) : (
              <h6>ya votaste</h6>
            )}
          </div>
          <div className="abajo">
            <Button
              variant="danger"
              onClick={() => {
                participar();
              }}
            >
              Termine
            </Button>
          </div>
        </StyledModal>
      </ModalProvider>
      <Footer />
    </Styles>
  );
}
