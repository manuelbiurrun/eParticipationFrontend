import React from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  #item {
    border-top: none;
    border-left: none;
    border-right: none;
  }
  #comment {
    margin-top: 10px;
    margin-left: 10px;
    padding-bottom: 0px;
    width: 70%;
  }
  #imagen {
    margin-top: 0px;
  }
`;

function Comentario({ data }) {
  return (
    <Styles>
      <ListGroup class="pb-5">
        <ListGroup.Item
          id="item"
          class="d-flex justify-content-between align-items-center mb-3"
        >
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <img src={data.imagen} alt="imagen" width="160" />
                <p> {data.correo} </p>
              </div>
              <div id="comment" class="col-md-8">
                <p>{data.fecha}</p>
                <p>{data.comentario}</p>
              </div>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Styles>
  );
}

export default Comentario;
