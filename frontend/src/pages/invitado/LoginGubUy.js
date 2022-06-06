import React from "react";
import { LoadingLogin } from "../../components/LoadingLogin";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getUserInfo } from "../../services/Requests";

//"end_session_endpoint": "https://auth-testing.iduruguay.gub.uy/oidc/v1/logout"
function LoginGubUy() {
  console.log("ya tengo el token!!");
  const [params] = useSearchParams();
  const code = params.get("code");
  console.log(code);
  const state = params.get("state");
  console.log(state);

  getAccessToken(code)
    .then((response) => {
      //falta algo
      getUserInfo(response.data)
        .then(() => {
          //falta algo
          //ir al backend y volver con el token y la info del usuario(PIO, que falta)
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <>
      <LoadingLogin />
    </>
  );
}

export default LoginGubUy;
