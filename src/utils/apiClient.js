import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error = null) => {
  refreshQueue.forEach(promise => {
    if (error) promise.reject(error);
    else promise.resolve();
  });
  refreshQueue = [];
};
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await apiClient.get("/auth/refresh");
        return apiClient(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;