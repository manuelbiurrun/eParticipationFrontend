import React from "react";
import axios from "axios";
import { Base64 } from "js-base64";
import { LoadingLogin } from "../../components/LoadingLogin";
import { useSearchParams } from "react-router-dom";

//"end_session_endpoint": "https://auth-testing.iduruguay.gub.uy/oidc/v1/logout"
function LoginGubUy() {
  const [params] = useSearchParams();
  const code = params.get("code");

    const plainCredentials = "890192" + ":" + "457d52f181bf11804a3365b49ae4d29a2e03bbabe74997a2f510b179";
    var bytes = [];
    for (var i = 0; i < plainCredentials.length; i++) {
      bytes.push(plainCredentials.charCodeAt(i));
    }
    const base64Credentials = Base64.encode(bytes);
    const authorizationHeader = "Basic " + base64Credentials;

    const tokenURL = axios.create({
      baseURL:
        "https://auth-testing.iduruguay.gub.uy",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Authorization': authorizationHeader,
      },
    });

    let bodyFormData = new FormData();
    bodyFormData.append('grant_type', 'authorization_code');
    bodyFormData.append('code', code);
    bodyFormData.append('redirect_uri', "https%3A%2F%2Feparticipationfront.herokuapp.com%2FloginGubUy");
    bodyFormData.append('state', 'info');

    tokenURL.post("/oidc/v1/token", bodyFormData).then((response) => {
      console.log(response.data.access_token);
      //llamada a "https://auth-testing.iduruguay.gub.uy/oidc/v1/userinfo"
    })
    .catch((error) => {console.log(error.data)});

  return (
    <>
      <LoadingLogin />
    </>
  );
}

export default LoginGubUy;
