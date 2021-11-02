import axios from "axios";
import { axiosInstance } from "../requestMethod";
import { LoginStart, LoginFailure, LoginSuccess, Logout } from "./Actions";

export const login = async (user, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axiosInstance.post("/auth/login", user);
    dispatch(LoginSuccess(res.data));
  } catch (error) {
    dispatch(LoginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(Logout());
};
