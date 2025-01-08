"use client";
import { title, subtitle } from "@/components/primitives";
import EstadisticaService from "@/services/EstadisticaService";
import Estadistica from "@/components/Estadisticas/Estadistica";
import { fechaHoy } from "@/utils/FechaHoy";
import { useState } from "react";

export default function Home() {
  const [fecha_sel, setFecha_sel] = useState(fechaHoy());
  const [ano_sel, setAno_sel] = useState(null);
  const [mes_ano_sel, setMes_ano_sel] = useState(null);

  const { data, mutate, isLoading } = EstadisticaService.getData({
    fecha: fecha_sel,
    mes_ano: mes_ano_sel,
    ano: ano_sel,
  });

  // console.log("fechaaaaaa", fechaHoy())

  console.log("dataaaaaaaa", data);

  console.log("fechaseeeeeeeeeeel", fecha_sel);
  console.log("MESSSSS SEL", mes_ano_sel);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-1">
      <div className="justify-center inline-block max-w-xl text-center">
        <span className={title()}>Sistema de Ingresos JMM</span>
      </div>

      <Estadistica
        fecha_sel={fecha_sel}
        setFecha_sel={setFecha_sel}
        setAno_sel={setAno_sel}
        setMes_ano_sel={setMes_ano_sel}
        data={data}
        isLoading={isLoading}
      />
    </section>
  );
}
