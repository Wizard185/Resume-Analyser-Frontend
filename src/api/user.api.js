import apiClient from "../utils/apiClient";

export const getMe = () =>
  apiClient.get("/users/me");

export const updateName = (data) =>
  apiClient.patch("/users/update-name", data);

export const changePassword = (data) =>
  apiClient.patch("/users/change-password", data);