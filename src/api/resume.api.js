import apiClient from "../utils/apiClient";

export const analyzeResume = (formData) => {
  return apiClient.post("/resume/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 60000, // Increase timeout for AI processing
  });
};

export const getAnalysisHistory = (page = 1, limit = 10) =>
  apiClient.get(`/analysis/history?page=${page}&limit=${limit}`);

export const deleteAnalysis = (id) =>
  apiClient.delete(`/analysis/${id}`);
