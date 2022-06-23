import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import user from "../../datosPrueba/ciudadano";
import Modal, { ModalProvider } from "styled-react-modal";
import { AiOutlineStop } from "react-icons/ai";
import { Noti, NotiError } from "../../components/Notification";
import { Button } from "react-bootstrap";
import { getUsuario, updateCiudadano, dejarSeguirAIniciativa } from "../../services/Requests";
import { GiMagnifyingGlass } from "react-icons/gi";
import { fetchUserID } from "../../services/Requests";

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
  body {
    background: rgb(99, 39, 120);
  }

  .form-control:focus {
    box-shadow: none;
    border-color: #ba68c8;
  }

  .profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none;
  }

  .profile-button:hover {
    background: #682773;
  }

  .profile-button:focus {
    background: #682773;
    box-shadow: none;
  }

  .profile-button:active {
    background: #682773;
    box-shadow: none;
  }

  .back:hover {
    color: #682773;
    cursor: pointer;
  }

  .labels {
    font-size: 11px;
  }

  .add-experience:hover {
    background: #ba68c8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #ba68c8;
  }
  #ini {
    margin-left: 5px;
    margin-right: 10px;
    border-radius: 0.25rem;
    background-color: white;
    &:focus {
      box-shadow: none;
      border-color: #e87121;
    }
  }
  .dirBtn {
    margin: 0;
    border: 0;
    padding: 0;
    background: hsl(216, 100, 50);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 150ms;
    background-color: white;

    &:hover {
      transform: rotateZ(90deg);
      background-color: transparent;
      &:focus {
        background: hsl(216, 100, 40);
        box-shadow: none;
      }
    }
  }
  #iniciativas {
    height: 40rem;
    overflow: scroll;
  }
  #iniciativas::-webkit-scrollbar {
    display: none;
  }

  #misIniciativas {
    height: 18rem;
    overflow: scroll;
  }
  #misIniciativas::-webkit-scrollbar {
    display: none;
  }
  #procesos {
    height: 16rem;
    overflow: scroll;
  }
  #procesos::-webkit-scrollbar {
    display: none;
  }
  h6 {
    margin-top: 10px;
  }
`;

export default function Perfil() {
  const usuario = fetchUserID();
  const [ciudadano, setCiudadano] = useState({
    id: "",
    cedula: "",
    nombreCompleto: "",
    correo: "",
    imagen: "",
    fechaNac: "",
    nacionalidad: "",
    domicilio: "",
    iniciativasCreadas: [],
    iniciativasAdheridas: [],
    iniciativasSeguidas: [],
  });

  const [datosCiudadano, setDatosCiudadano] = useState({
    nombreCompleto: "",
    domicilio: "",
    correo: "",
    contrasena: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [recurso, setRecurso] = useState();

  const handleChange = (e) => {
    e.persist();
    setDatosCiudadano((datosCiudadano) => ({
      ...datosCiudadano,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = (data) => {
    setRecurso(data.target.files[0]);
  };

  const [unfollowOpen, isUnfollowOpen] = useState();
  const [iniciativa, setIniciativa] = useState();

  useEffect(() => {
    getUsuario(usuario)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setCiudadano(response.data);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        NotiError(error.response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unfollowIniciativa = () => {
    isUnfollowOpen(!unfollowOpen);
  };
  const onUnfollow = () => {
    dejarSeguirAIniciativa(iniciativa, usuario)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const onGuardar = (e) => {
    e.preventDefault();
    const confirmar = document.getElementById("confirmar").value;
    if (
      datosCiudadano.contrasena !== "" &&
      datosCiudadano.contrasena !== confirmar
    ) {
      NotiError("las contraseñas no son iguales");
    } else {
      updateCiudadano(datosCiudadano).then((response) => {
        if (response.status === 200) {
          Noti("datos guardados con exito!!");
          setTimeout(() => {
            window.location.replace("/");
          }, 3000);
        } else {
          NotiError("Algo salio mal!!");
        }
      });
    }
  };

  return (
    <Styles>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src={user.imagen}
                alt="nose"
              />
              <span class="font-weight-bold">{ciudadano.nombre}</span>
              <span class="font-weight-bold">{ciudadano.fNac}</span>
              <span class="text-black-50">{ciudadano.correo}</span>
              <span class="text-black-50">{ciudadano.nacionalidad}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center experience">
              <h5>Mis Iniciativas</h5>
            </div>
            <br />
            <div id="misIniciativas" class="col-md-12">
              {ciudadano.iniciativasCreadas.map((ini, index) => {
                return (
                  <div
                    className="d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <span className="numero">{index + 1}-</span>
                    <input
                      className="form-control"
                      id="ini"
                      value={ini}
                      readOnly
                    />

                    <Button
                      className="dirBtn"
                      href={"/iniciativa?nombre=" + ini}
                    >
                      <GiMagnifyingGlass color="#3d3d3d" fontSize="1.5rem" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <form onSubmit={onGuardar} class="col-md-4 border-right">
            <div>
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Mi Perfil</h4>
                </div>
                <div class="row mt-2">
                  <div class="col-md-12">
                    <label class="labels">Nombre</label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      onChange={handleChange}
                      class="form-control"
                      placeholder={ciudadano.nombre}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labels">Domicilio</label>
                    <input
                      type="text"
                      name="domicilio"
                      onChange={handleChange}
                      class="form-control"
                      placeholder={ciudadano.domicilio}
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Email</label>
                    <input
                      type="email"
                      name="correo"
                      onChange={handleChange}
                      class="form-control"
                      placeholder={ciudadano.correo}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labels">Imagen de perfil</label>
                    <input
                      onChange={handleUpload}
                      type="file"
                      class="form-control"
                    />
                  </div>
                </div>
                <h6>Cambiar contraseña</h6>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labels">Contraseña</label>
                    <input
                      type="password"
                      class="form-control"
                      name="contrasena"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labels">Confirmar contraseña</label>
                    <input
                      type="password"
                      class="form-control"
                      id="confirm"
                      required={datosCiudadano.contrasena !== ""}
                    />
                  </div>
                </div>
                <div class="mt-5 text-center">
                  <button class="btn btn-primary profile-button" type="submit">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div class="col-md-4">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center">
                <h5>Iniciativas</h5>
              </div>
              <br />
              <div id="iniciativas" class="col-md-12">
                {ciudadano.iniciativasSeguidas.map((ini, index) => {
                  return (
                    <div
                      className="d-flex justify-content-between align-items-center"
                      key={index}
                    >
                      <span className="numero">{index + 1}-</span>
                      <input
                        className="form-control"
                        id="ini"
                        value={ini}
                        readOnly
                      />
                      <button
                        className="dirBtn"
                        onClick={() => {
                          setIniciativa(ini);
                          unfollowIniciativa();
                        }}
                      >
                        <AiOutlineStop color="#3d3d3d" fontSize="1.5rem" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <ModalProvider>
        <StyledModal
          isOpen={unfollowOpen}
          onBackgroundClick={unfollowIniciativa}
          onEscapeKeydown={unfollowIniciativa}
        >
          <h4>Dejar de seguir {iniciativa}</h4>
          <hr />
          <div className="cuerpo">
            <h6>
              Seguro que quieres dejar de seguir la iniciativa {iniciativa}?
            </h6>
          </div>
          <div className="abajo">
            <Button variant="secondary" onClick={unfollowIniciativa}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onUnfollow(iniciativa);
                unfollowIniciativa();
              }}
            >
              Confirmar
            </Button>
          </div>
        </StyledModal>
      </ModalProvider>
      <Footer />
    </Styles>
  );
}
