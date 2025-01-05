import useSWR from "swr";
import api from "@/lib/axios";

class ConceptoService {
  static async get() {
    return (await api.get('api/conceptos')).data;
  }
}

export default ConceptoService;