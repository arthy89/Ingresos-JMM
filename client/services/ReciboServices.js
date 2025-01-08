import useSWR from "swr";
import api from "@/lib/axios";

class ReciboService {
  static getData(params = {}) {
    return useSWR(["api/recibos", params], async ([url, params]) => {
      return (await api.get(url, { params })).data;
    });
  }

  static async get(id) {
    return (await api.get(`api/recibos/${id}`)).data;
  }

  static async delete(id) {
    return await api.delete(`api/recibos/${id}`);
  }
}

export default ReciboService;
