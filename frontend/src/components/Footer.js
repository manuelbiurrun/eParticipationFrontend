import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .footer {
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 60px; /* Height of the footer */
    background-color: #1f618d;
    font-family: "Poppins", sans-serif;
    color: #f2f2f2;
  }
`;

export const Footer = () => (
  <Styles>
    <React.Fragment>
      <footer className="footer py-3">
        <div className="container">
          <span> eparticipation@gmail.com</span>
        </div>
      </footer>
    </React.Fragment>
  </Styles>
);
