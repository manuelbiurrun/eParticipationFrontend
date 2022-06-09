import React from "react";
import { LoadingLogout } from "../components/LoadingLogout";
import { clearState } from "../services/Requests";

function LogoutGubUy() {
  clearState();
  window.location.replace("/");
  return (
    <div>
      <LoadingLogout />
    </div>
  );
}

export default LogoutGubUy;
