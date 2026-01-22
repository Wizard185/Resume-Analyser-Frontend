import apiClient from "../utils/apiClient.js";

export const loginUser = (data) =>
  apiClient.post("/auth/login", data);

export const registerUser = (data) =>
  apiClient.post("/auth/register", data);

export const logoutUser = () =>
  apiClient.post("/auth/logout");

export const logoutAllDevices = () =>
  apiClient.post("/auth/logout-all");

export const refreshToken = () =>
  apiClient.post("/auth/refresh");