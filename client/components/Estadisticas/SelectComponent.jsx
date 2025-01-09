import React from "react";
import { Select, SelectItem, DatePicker } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { generar_meses, generar_ano } from "@/utils/Generador_Fechas";

function SelectComponent({
  fecha_sel,
  setFecha_sel,
  setAno_sel,
  setMes_ano_sel,
}) {
  const meses = generar_meses();
  const anos = generar_ano();
  // console.log("mesesssssssss", meses);
  // console.log("años", anos);

  // console.log("FECHAAAAAAAAAAAAAAAAAAAAA", fecha_sel);
  const fecha = (fechaString) => {
    if (!fechaString) return null; // Si fechaString es null o undefined, retorna null directamente
  
    const [year, month, day] = fechaString.split("-").map(Number);
  
    if (year !== 0) {
      return new CalendarDate(year, month, day);
    }
  
    return null; // En caso de que year sea 0 o no válido
  };

  const handle_fecha = (e) => {
    // console.log("fecha", e.year + "-" + e.month + "-" + e.day);
    setFecha_sel(e.year + "-" + e.month + "-" + e.day);
    setAno_sel(null);
    setMes_ano_sel(null);
  };

  const handle_mes = (e) => {
    // console.log(e);
    setMes_ano_sel(e);
    setFecha_sel(null);
    setAno_sel(null);
  };

  const handle_ano = (e) => {
    // console.log(e);
    setAno_sel(e);
    setMes_ano_sel(null);
    setFecha_sel(null);
  };

  return (
    <div className="flex gap-4 flex-cols">
      {/* Fecha Exacta */}
      <DatePicker
        label="Fecha exacta"
        onChange={(e) => handle_fecha(e)}
        value={fecha(fecha_sel) || null}
      />

      {/* Mes - Año */}
      <Select
        className="max-w-xs"
        label="Mes"
        onChange={(e) => handle_mes(e.target.value)}
      >
        {meses.map((mes) => (
          <SelectItem key={mes.value}>{mes.mes}</SelectItem>
        ))}
      </Select>

      {/* Año */}
      <Select
        className="max-w-xs"
        label="Año"
        onChange={(e) => handle_ano(e.target.value)}
      >
        {anos.map((ano) => (
          <SelectItem key={ano.value}>{ano.ano}</SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectComponent;
