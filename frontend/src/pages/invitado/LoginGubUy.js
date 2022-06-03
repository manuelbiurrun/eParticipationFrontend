import React from "react";
import { LoadingLogin } from "../../components/LoadingLogin";

function LoginGubUy() {
  console.log("llego hasta aca, hurraaaaaaay!!");
  //obtener el code y el status del response
  // con el code, ir a buscar el token
  //con el token, ir a buscar el correo del usuario
  //preguntar al backend por tipo de usuario y recibir informacion del usuario y token
  //redireccionar a /
  return (
    <>
      <LoadingLogin />
    </>
  );
}

export default LoginGubUy;
