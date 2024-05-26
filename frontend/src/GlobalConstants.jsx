import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";

const decoded_token = localStorage.getItem("token") ?  jwtDecode(localStorage.getItem("token")) : {}

const GLOBAL_CONSTANTS = {
  backend_host: import.meta.env.VITE_BACKEND_API_URL,

  token: "Bearer " + (localStorage.getItem("token") || ""),

  userData : decoded_token,
  userType : decoded_token?.role ?? "",
};

export const useGlobalConstants = () => {
  const handleStorageEvent = (event) => {
  if (event.key === "token") {
      GLOBAL_CONSTANTS.token = "Bearer " + event.newValue;
    }
  };
  useEffect(() => {
    window.addEventListener("storage", handleStorageEvent);
    
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);
};

export default GLOBAL_CONSTANTS;
