import useSWR from "swr";
import api from "@/lib/axios";

class ConceptoService {
  static getData(params = {}) {
    return useSWR(["api/conceptos_all", params], async ([url, params]) => {
      return (await api.get(url, {params})).data;
    });
  }

  static async get() {
    return (await api.get('api/conceptos')).data;
  }

  static async getId(id) {
    return (await api.get(`api/conceptos/${id}`)).data;
  }

  static async delete(id) {
    return await api.delete(`api/conceptos/${id}`);
  }
}

export default ConceptoService;