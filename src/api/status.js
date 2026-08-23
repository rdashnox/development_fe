import api from "./axios";
import { endpoints } from "../config";

export const statusApi = {
  async listStatus() {
    // Reusing internship endpoint as it contains status information
    const response = await api.get(endpoints.internships.root);
    return response.data.data;
  },
};
