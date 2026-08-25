import api from "./axios";

import { endpoints } from "../config";

export const studentApi = {
    async listStudents() {
        const response = await api.get(endpoints.students.root);
        return response.data.data;
    },
}