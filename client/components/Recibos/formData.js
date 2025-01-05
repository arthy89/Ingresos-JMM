import { fechaHoy } from "@/utils/FechaHoy"

export const formData = {
  id: null,
  estudiante_id: null,

  num: "",
  fecha: fechaHoy(),
  senor: "",
  total: 0,
  comentarios: "",

  items: [],

  estudiante: {
    dni: "",
    nombre: "",
  },
}