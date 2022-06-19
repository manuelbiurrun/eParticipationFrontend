import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { Button, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { NotiError } from "../../components/Notification";
import { getProcesos, getProceso, getProcesosRango } from "../../services/Requests";

import "react-datepicker/dist/react-datepicker.css";

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
    float: right;
  }
  #listado::-webkit-scrollbar {
    display: none;
  }
`;

function Procesos() {
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState({ nombre: "" });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    getProcesos(nombre, startDate, endDate)
      .then((response) => {
        setData(response.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(nombre.nombre !== "") {
      setData([]);
      getProceso(nombre.nombre).then((response) => {
        console.log(response.data);
        if(response.data === "proceso null") {
          NotiError("proceso no existe");
        } else {
          let newData = [];
          newData.push(response.data);
          setData(newData);
        }
      })
      .catch((error) => {console.log(error.data)});
    } else if(nombre.nombre === "" && startDate === null && endDate === null) {
      getProcesos()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        NotiError(error.response.data);
      });
    } else {
      getProcesosRango(startDate, endDate).then((response) => {
        setData(response.data);
      })
      .catch((error) => {console.log(error.data)});
    }
  }

  const onClearDate = () => {
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <Styles>
      <Layout>
        <form onSubmit={handleSubmit} id="buscador">
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
              <Button type="submit" variant="secondary">Buscar</Button>
            </div>
          </div>
        </form>
        <div id="listado">
          {data !== null &&
            data.map((proc) => {
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
                          <p> {proc.nombre} </p>
                        </div>
                        <div id="comment" class="col-md-4">
                          <p>{proc.fecha}</p>
                          <p>{proc.comentario}</p>
                        </div>
                        <div id="verMasButton" class="col-md-2">
                          <Button
                            id="verMasButton"
                            href={"/proceso?nombre=" + proc.nombre}
                          >
                            ver mas
                          </Button>
                        </div>
                        <div id="verMasButton" class="col-md-2">
                          <Button
                            id="verMasButton"
                            href={"/participarProceso?nombre= " + proc.nombre} //todavia no se como hacer esto
                          >
                            involucrarme
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
        </div>
      </Layout>
      <Footer />
    </Styles>
  );
}

export default Procesos;
