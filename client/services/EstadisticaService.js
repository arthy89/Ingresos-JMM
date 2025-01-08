import useSWR from "swr";
import api from "@/lib/axios";

class EstadisticaService {
  static getData(params = {}) {
    return useSWR(["api/estadisticas", params], async ([url, params]) => {
      return (await api.get(url, { params })).data;
    });
  }
}

export default EstadisticaService;
