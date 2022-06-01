import axios from "axios";

// Crear base de Axios "instance"
const instance = axios.create({
  baseURL:
    "https://eparticipation.web.elasticloud.uy/backend-web/eParticipation",
  headers: {
    "Content-Type": "application/json",
  },
});

/*
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error.response) {
      if (error.response.data.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          instance.defaults.headers.common["Authorization"] = getToken();
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (error.response.data.status === 403 && error.response.data) {
        return Promise.reject(error.response.data);
      }
    }

    return Promise.reject(error);
  }
); */

//esta funcion es para cerrar sesion
export const clearState = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userID");
  localStorage.removeItem("userCI");
  sessionStorage.removeItem("facebookLogin");
  sessionStorage.clear();
  window.location.replace("/");
};

export const fetchUserRole = () => {
  return localStorage.getItem("userRole");
};

export const fetchUserID = () => {
  return localStorage.getItem("userID");
};

export const fetchUserData = () => {
  const cedula = localStorage.getItem("userCI");
  return instance.get(`/usuario/buscarCedula/${cedula}`);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const userLogin = () => {
  sessionStorage.setItem("facebookLogin", false);
  //faltan las variables de entorno(.env)
  const authURL =
    "https://auth-testing.iduruguay.gub.uy/oidc/v1/authorize?" +
    "response_type=code" +
    "&client_id=890192" +
    "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FLoginGubUy" +
    "&scope=openid%20personal%20email";
  return window.location.replace(authURL);
};

export const loginExterno = (datosUsuario) => {
  return instance.get(`/externalAuth/facebook/${datosUsuario}`);
};

export const getIniciativas = (nombre, fechaInicio, fechaFin) => {
  return instance.get(
    `/iniciativa/listar?iniciativa=${nombre}&fechaIni=${fechaInicio}?fechafin=${fechaFin}`
  );
};

export const newIniciativa = (iniciativa) => {
  return instance.post("/iniciativa/alta", iniciativa);
};

export const updateIniciativa = (iniciativa) => {
  return instance.put("/iniciativa/modificar", iniciativa);
};

export const deleteIniciativa = (iniciativa) => {
  return instance.delete(`/iniciativa/modificar?iniciativa=${iniciativa}`);
};

export const getIniciativa = (nombreIniciativa) => {
  return instance.get(`/iniciativa/buscar/${nombreIniciativa}`);
};

export const getProcesos = () => {
  return instance.get("/proceso/listar");
};

/* export const newProceso = (proceso) => {
  return instance.post("/procesos/nuevoProceso", proceso);
}; */

export const seguirAIniciativa = (idIniciativa, correoCiudadano) => {
  return instance.post(
    `/iniciativa/seguir?iniciativa=${idIniciativa}&user=${correoCiudadano}`
  );
};

export const comentarIniciativa = (comentario, usuario, iniciativa) => {
  return instance.post(
    `/iniciativa/comentar?iniciativa=${iniciativa}&user=${usuario}`,
    comentario
  );
};

export const adherirAIniciativa = (nombreIniciativa, correoCiudadano) => {
  return instance.post(
    `/iniciativa/adherir?iniciativa=${nombreIniciativa}&user=${correoCiudadano}`
  );
};

export const getUsuario = (nombreCiudadano) => {
  return instance.get(`/usuario/buscar/${nombreCiudadano}`);
};

export const updateUsuario = (datos) => {
  return instance.put("/usuario/modificar", datos);
};

export const ciudadanoSigueIniciativa = (iniciativa, ciudadano) => {
  return instance.get(
    `/usuario/ifSigue?iniciativa=${iniciativa}&user=${ciudadano}`
  );
};

export const ciudadanoAdheridoIniciativa = (iniciativa, ciudadano) => {
  return instance.get(
    `/usuario/ifAdherido?iniciativa=${iniciativa}&user=${ciudadano}`
  );
};