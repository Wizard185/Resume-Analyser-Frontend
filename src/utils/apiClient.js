import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Handle 401 globally if needed, though Context handles user state
    if (error.response && error.response.status === 401) {
      // If we are not on the login page, we might want to redirect
      // but usually the AuthContext listener will handle the null user state
    }
    return Promise.reject(error);
  }
);

export default apiClient;