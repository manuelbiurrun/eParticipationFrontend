import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { Button, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { NotiError, Noti } from "../../components/Notification";
import Modal, { ModalProvider } from "styled-react-modal";
import {
  getIniciativas,
  ciudadanoSigueIniciativa,
  ciudadanoAdheridoIniciativa,
  adherirAIniciativa,
  getUsuario,
  fetchUserID,
  seguirAIniciativa,
} from "../../services/Requests";

import "react-datepicker/dist/react-datepicker.css";

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
  #buscador {
    position: absolute;
    height: 10%;
    width: 70%;
    margin-top: 15px;
    margin-left: 40px;
    margin-bottom: 15px;
    border-radius: 10px;
    color: black;
    padding-top: 50px;
    padding-left: 5%;
  }

  #listado {
    position: absolute;
    width: 70%;
    height: 70%;
    margin-top: 150px;
    margin-left: 40px;
    border-radius: 10px;
    overflow: scroll;
    border-style: solid;
    color: black;
  }
  input {
    margin-left: 5px;
  }
  #verMasButton {
    padding-left: 50px;
  }
  #adherirmeButton {
    margin-right: 30px;
  }
  #listado::-webkit-scrollbar {
    display: none;
  }
`;

function Iniciativas() {
  const usuario = fetchUserID();
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState({ nombre: "" });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ciudadano, setCiudadano] = useState({
    nombre: "",
    correo: "",
    fechaNac: "",
    domicilio: "",
    nacionalidad: "",
  });

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

  const [unfollowOpen, isUnfollowOpen] = useState();
  const [iniciativa, setIniciativa] = useState();

  const unfollow = () => {
    isUnfollowOpen(!unfollowOpen);
  };

  const onUnfollow = (ini) => {};

  useEffect(() => {
    getIniciativas(nombre, startDate, endDate)
      .then((response) => {
        setData(response.data);
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

  const handleChange = (e) => {
    e.persist();
    setNombre((nombre) => ({
      ...nombre,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onClearDate = () => {
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <Styles>
      <Layout>
        <div id="buscador">
          <div class="row align-items-center">
            <div class="col-md-4">
              <label htmlFor="nombre">Nombre</label>
              <input
                onChange={handleChange}
                name="nombre"
                id="nombre"
                type="text"
              />
            </div>
            <div class="col-md-3">
              <DatePicker
                id="fechas"
                name="fechas"
                selected={startDate}
                onChange={onChangeDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat="yyyy-MM-dd"
                placeholderText="Fechas Entrega"
              />
            </div>
            <div class="col-md-3">
              <Button onClick={() => onClearDate()} variant="danger">
                clear date
              </Button>
            </div>
            <div class="col-md-2">
              <Button variant="secondary">Buscar</Button>
            </div>
          </div>
        </div>
        <div id="listado">
          {data !== null &&
            data.map((ini) => {
              //falta retocar
              return (
                <ListGroup class="pb-5">
                  <ListGroup.Item
                    id="item"
                    class="d-flex justify-content-between align-items-center mb-3"
                  >
                    <div class="container">
                      <div class="row">
                        <div class="col-md-3">
                          <p> {ini.nombre} </p>
                        </div>
                        <div id="comment" class="col-md-3">
                          <p>{ini.fecha}</p>
                          <p>{ini.comentario}</p>
                        </div>
                        <div id="adherirmeButton" class="col-md-1">
                          {ciudadanoAdheridoIniciativa(
                            ini.nombre,
                            ciudadano.correo
                          ) ? (
                            <Button
                              disabled={ciudadanoAdheridoIniciativa(
                                ini.nombre,
                                ciudadano.correo
                              )}
                            >
                              Adherido
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                onAdherirse(ini.nombre);
                              }}
                              disabled={ciudadanoAdheridoIniciativa(
                                ini.nombre,
                                ciudadano.correo
                              )}
                            >
                              Adherirse
                            </Button>
                          )}
                        </div>
                        <div class="col-md-2">
                          {ciudadanoSigueIniciativa(
                            ini.nombre,
                            ciudadano.correo
                          ) ? (
                            <Button
                              onClick={() => {
                                setIniciativa(ini.nombre);
                                unfollow();
                              }}
                            >
                              Dejar de seguir
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                onSeguir(ini.nombre);
                              }}
                            >
                              Seguir
                            </Button>
                          )}
                        </div>
                        <div id="verMasButton" class="col-md-2">
                          <Button href={"/iniciativa?nombre=" + ini.nombre}>
                            ver mas
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
        </div>
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
        </ModalProvider>
      </Layout>
      <Footer />
    </Styles>
  );
}

export default Iniciativas;
