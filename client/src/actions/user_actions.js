import axios from "axios";

import { LOGIN_USER } from "./types";

export default function (dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
