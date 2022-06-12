import React from "react";
import axios from "axios";
import { LoadingLogin } from "../../components/LoadingLogin";
import { useSearchParams } from "react-router-dom";

//"end_session_endpoint": "https://auth-testing.iduruguay.gub.uy/oidc/v1/logout"
function LoginGubUy() {
  const [params] = useSearchParams();
  const code = params.get("code");

    const plainCredentials = process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET;
    const base64Credentials = Base64.getEncoder().encode(plainCredentials.getBytes());
    const authorizationHeader = "Basic " + base64Credentials;

    const tokenURL = axios.create({
      baseURL:
        "https://auth-testing.iduruguay.gub.uy",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorizationHeader,
      },
    });

    let bodyFormData = new FormData();
    bodyFormData.append('grant_type', 'authorization_code');
    bodyFormData.append('code', code);
    bodyFormData.append('redirect_uri', process.env.REDIRECT_URI);
    bodyFormData.append('state', 'info');

    tokenURL.post("/oidc/v1/token", bodyFormData).then((response) => {
      console.log(response.data.access_token);
      //llamada a "https://auth-testing.iduruguay.gub.uy/oidc/v1/userinfo"
    });

  return (
    <>
      <LoadingLogin />
    </>
  );
}

export default LoginGubUy;
