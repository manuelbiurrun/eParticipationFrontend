import axios from "axios";

//https://eparticipation.web.elasticloud.uy/backend-web/eParticipation
//http://node2394-eparticipation.web.elasticloud.uy/backend-web/

// Crear base de Axios "instance"
const instance = axios.create({
  baseURL:
    "https://eparticipation.web.elasticloud.uy/backend-web/eParticipation",
  headers: {
    'Content-Type': 'application/json',
  },
});

/* const instance = axios.create({
  baseURL:
    "https://eparticipation.web.elasticloud.uy/backend-web/eParticipation",
  headers: {
    'Content-Type': 'application/json', 
  },
}); */

/*
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        config.headers["RefreshAuthentication"] = "Bearer " + refreshToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  sessionStorage.clear();
  window.location.replace("/");
};

export const fetchUserRole = () => {
  return localStorage.getItem("userRole");
};

export const fetchUserID = () => {
  return localStorage.getItem("userID");
};

export const fetchUserCI = () => {
  return localStorage.getItem("userCI");
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
  const authURL =
    "https://auth-testing.iduruguay.gub.uy/oidc/v1/authorize?" +
    "response_type=code" +
    "&client_id=890192" +
    "&redirect_uri=https%3A%2F%2localhost" +
    "&scope=openid%20personal%20email";
  return window.location.replace(authURL);
};

export const loginExterno = (datosUsuario) => {
  return instance.get(`/externalAuth/facebook/${datosUsuario}`);
};

export const getIniciativas = () => {
  return instance.get(
    "/iniciativa/listar"
  );
};

export const getIniciativasRango = (fechaInicio, fechaFin) => {
  return instance.get(
    `/iniciativa/listarRango?fecha=${fechaInicio}&fecha=${fechaFin}`
  );
};

export const getProcesosRango = (fechaInicio, fechaFin) => {
  return instance.get(
    `/proceso/listarRango?fecha=${fechaInicio}&fecha=${fechaFin}`
  );
};

export const newIniciativa = (iniciativa) => {
  return instance.post("/iniciativa/alta", iniciativa);
};

export const updateIniciativa = (iniciativa) => {
  return instance.put("/iniciativa/modificar", iniciativa);
};

export const updateProceso = (proceso) => {
  return instance.put("/proceso/modificar", proceso);
}

export const deleteIniciativa = (iniciativa) => {
  return instance.post(`/iniciativa/baja?nombre=${iniciativa}`);
};

export const getIniciativa = (nombreIniciativa) => {
  return instance.get(`/iniciativa/buscar/${nombreIniciativa}`);
};

export const getProceso = (nombreProceso) => {
  return instance.get(`proceso/buscar/${nombreProceso}`);
};

export const getProcesos = () => {
  return instance.get("/proceso/listar");
};

export const getProcesosCiudadano = (usuario) => {
  return instance.get(`/usuario/listarProcesos?user=${usuario}`);
};

export const newProceso = (proceso) => {
  return instance.post("/proceso/alta", proceso);
};

export const seguirAIniciativa = (idIniciativa, correoCiudadano) => {
  return instance.post(
    `/iniciativa/seguir?iniciativa=${idIniciativa}&user=${correoCiudadano}`
  );
};

export const dejarSeguirAIniciativa = (idIniciativa, correoCiudadano) => {
  return instance.post(
    `/iniciativa/dejarSeguir?iniciativa=${idIniciativa}&user=${correoCiudadano}`
  );
};

export const comentarIniciativa = (comentario, usuario, iniciativa) => {
  return instance.post(
    `/iniciativa/comentar?comentario=${comentario}&user=${usuario}&iniciativa=${iniciativa}`,
    comentario
  );
};

export const comentarProceso = (comentario, usuario, proceso) => {
  return instance.post(
    `/iniciativa/comentar?comentario=${comentario}&user=${usuario}&proceso=${proceso}`,
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
  return instance.put("/usuario/modificarUsuario", datos);
};

export const ciudadanoSigueIniciativa = (iniciativa, ciudadano) => {
  return instance.get(
    `/usuario/ifSigueI?iniciativa=${iniciativa}&user=${ciudadano}`
  );
};

export const ciudadanoSigueProceso = (iniciativa, ciudadano) => {
  return instance.get(
    `/usuario/ifSigueP?iniciativa=${iniciativa}&user=${ciudadano}`
  );
};

export const ciudadanoAdheridoIniciativa = (iniciativa, ciudadano) => {
  return instance.get(
    `/usuario/ifAdherido?iniciativa=${iniciativa}&user=${ciudadano}`
  );
};

export const ciudadanoParticipoProceso = (proceso, ciudadano) => {
  return instance.get(
    `/usuario/ifParticipaP?proceso=${proceso}&user=${ciudadano}`
  );
};

export const participarProceso = (data) => {
  return instance.post(
    "/proceso/participar", data
  );
};

export const eleccionProcesoCiudadano = (proceso, ciudadano) => {
  return instance.get(
    `/usuario/participacion?proceso=${proceso}&user=${ciudadano}`
  );
};
