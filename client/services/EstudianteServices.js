import useSWR from "swr";
import api from "@/lib/axios";

class EstudianteService {
  static getData(params = {}) {
    return useSWR(["api/estudiantes", params], async ([url, params]) => {
      return (await api.get(url, { params })).data;
    });
  }

  static async get(id) {
    return (await api.get(`api/estudiantes/${id}`)).data;
  }

  static async getDNI(dni) {
    return (await api.get(`api/estudiantes/dni/${dni}`)).data;
  }

  static async delete(id) {
    return await api.delete(`api/estudiantes/${id}`);
  }
}

export default EstudianteService;