import React from "react";
import { Layout } from "../../components/Layout";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import Votacion from "../../components/Votacion";

const Styles = styled.div``;

export default function Perfil() {
  return (
    <Styles>
      <Layout>
        <h1>Perfil Funcinario</h1>
        <Votacion />
      </Layout>
      <Footer />
    </Styles>
  );
}
