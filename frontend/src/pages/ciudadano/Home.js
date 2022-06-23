import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import { NotiError, Noti } from "../../components/Notification";
import { Button } from "react-bootstrap";
import Modal, { ModalProvider } from "styled-react-modal";
import Poll from "@gidesan/react-polls";
import {
  getIniciativas,
  //getProcesosCiudadano,
  getProcesos,
  updateProceso,
  getUsuario,
  ciudadanoAdheridoIniciativa,
  participarProceso,
  ciudadanoParticipoProceso,
  //eleccionProcesoCiudadano,
  ciudadanoSigueIniciativa,
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
  const [iniciativa] = useState({nombre: ""});
  const onSeguir = () => {
    ciudadanoSigueIniciativa(iniciativa.nombre, ciudadano.correo).then((response) => {
      console.log(response.data);
      if(response.data === false) {
        seguirAIniciativa(iniciativa.nombre, ciudadano.correo).then((res) => {
          if (res.status === 200) {
            Noti("Estas siguiendo a la iniciativa " + iniciativa.nombre);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            NotiError("hubo un error inesperado");
          }
        })
      } else {
        NotiError("ya seguis a esta iniciativa");
      }
    })
  .catch((error) => {
    console.log(error.data)
  });
  };

  const [participarOpen, isParticiparOpen] = useState();
  const [pregunta, setPregunta] = useState();
  let opciones = [];
  const [proceso, setProceso] = useState({
    id: "",
    nombre: "",
    descripcionAlcance: "",
    fecha: "",
    fase: "",
    creador: "",
    participantes: [],
    instrumento: "",
    contenidoInstrumento: [],
  });

  const participar = () => {
    isParticiparOpen(!participarOpen);
  };

  const formatearRespuesta = (res) => {
    let retorno = [];
    for(let i = 0; i < res.length; i++) {
      const opcion = obtenerOpcionRetorno(res[i]);
      retorno.push(opcion);
    }
    return retorno;
  }

  const obtenerOpcionRetorno = (content) => {
    console.log(content);
    const valueOption = content.option;
    const valueVotes = content.votes.toString();
    return "option:" + valueOption + ",votes:" + valueVotes;
  }

  const onParticipar = (opcion) => {
    const newAnswers = opciones.map((answer) => {
      if (answer.option === opcion) {
        answer.votes++;
      }
      return answer;
    });
    console.log(proceso.instrumento);
    console.log(pregunta);
    console.log(opcion);
    //participarProceso({proceso: proceso.nombre, user: ciudadano.correo, respuesta: [proceso.instrumento, pregunta, opcion]});
    proceso.contenidoInstrumento = formatearRespuesta(newAnswers);
    console.log(proceso);
    //updateProceso(proceso);
  };

  const onAdherirse = () => {
    ciudadanoAdheridoIniciativa(iniciativa.nombre, ciudadano.correo).then((response) => {
      if(response.data === false) {
        adherirAIniciativa(iniciativa.nombre, ciudadano.correo).then((res) => {
          if (res.status === 200) {
            Noti("Estas adherido a la iniciativa " + iniciativa.nombre);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            NotiError("hubo un error inesperado");
          }
        });
      } else {
        NotiError("ya estas adherido a esta iniciativa");
      }
    }).catch((error) => {console.log(error.data);});
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

  const sacarPregunta = (p) => {
      const pregunta = p.contenidoInstrumento[p.contenidoInstrumento.length - 1];
      setPregunta(pregunta);
  }

  const obtenerOpcion = (content) => {
    const array = content.split(",");//array[0] es la option y array[1] es el votes
    const valueOption = array[0].split(":")[1];
    const valueVotes = array[1].split(":")[1];
    console.log(valueOption + ", " + valueVotes);
    return {"option": valueOption, "votes": valueVotes};    
  }

  let tieneOpciones;
  const sacarOpciones = (pr) => {
    const contenido = pr.contenidoInstrumento;
    console.log(contenido);
    for(let i = 0; i < contenido.length-1; i++) {
      const opcion = obtenerOpcion(contenido[i]);
      opciones.push(opcion);
    }
    console.log(opciones);
    tieneOpciones = true;
    sacarPregunta(pr);
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
    /* getProcesosCiudadano(usuario)
      .then((response) => {
        console.log(response.data);
        setProcesos(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        NotiError(error.response.data);
      }); */
    getProcesos()
      .then((response) => {
        console.log(response.data);
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

  const opt = [{option: "primera", votes: "0"}];

  return (
    <Styles>
      <nav>
        <h1 align="center">Bienvenido {ciudadano.nombre}!!</h1>
      </nav>
      <aside id="izquierda">
        {iniciativas.length !== 0 ? iniciativas.map((ini, index) => {
          return (
            <article key={index}>
              <figure>
                <img
                  src={ini.recurso}
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
                iniciativa.nombre = ini.nombre;
                onSeguir();
              }}
              >
                Seguir
              </Button>
              <Button
                id="adButton"
                onClick={() => {
                  iniciativa.nombre = ini.nombre;
                  onAdherirse();
                }}
              >
                Adherirse
              </Button>
            </article>
          );
        }): <h1>no hay iniciativas</h1>}
        <Button id="todasButton" variant="danger" href="/iniciativas">
          Ver mas iniciativas
        </Button>
      </aside>
      <aside id="derecha">
        {procesos.map((proc) => {
          return (
            <article key={proc.id}>
              <h6>{proc.fecha}</h6>
              <h1>{proc.nombre}</h1>
              <p>Edad minima: {proc.descripcionAlcance}</p>
              <Button href={"proceso?nombre=" + proc.nombre}>Ver mas</Button>
              <Button
                onClick={() => {
                  setProceso(proc);
                  opciones = [];
                  ciudadanoParticipoProceso(proc.nombre, ciudadano.correo).then((response) => {
                    const participo = response.data;
                    console.log(response.data);
                    console.log(proc);
                    if(!participo) {
                      sacarOpciones(proc);
                    }
                    participar();
                  })
                }}
              >
                Participar
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
          isOpen={participarOpen}
          onBackgroundClick={participar}
          onEscapeKeydown={participar}
        >
          <h4>Participar en {proceso.nombre}</h4>
          <hr />
          <div className="cuerpo">
            {console.log(opciones)}
{/*             {tieneOpciones ? ( */}
              <Poll
                id="poll"
                question={pregunta}
                answers={opciones}
                onVote={onParticipar}
                customStyles={pollStyles1}
                noStorage
              />
            {/* ) : (
              <h6>ya votaste en el proceso {proceso.nombre}</h6>
            )}*/}
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
