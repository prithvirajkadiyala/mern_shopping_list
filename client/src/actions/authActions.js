import Axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./types";

//Check token and load user

export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  Axios.get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      }),
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Setup config/header and token
export const tokenConfig = (getState) => {
  //Get token from localStorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token, add to the headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
