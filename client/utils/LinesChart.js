import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function LinesChart({ data }) {
  // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data?.recuento_anual);

  const [meses, setMeses] = useState([]);
  const [valores, setValores] = useState([]);

  // Efecto para actualizar los meses cuando la data cambia
  useEffect(() => {
    if (data?.recuento_anual) {
      const nuevosMeses = data.recuento_anual.map((mes) => mes.mes); // Extrae los nombres de los meses
      setMeses(nuevosMeses); // Actualiza el estado

      const nuevosValores = data.recuento_anual.map((valor) => valor.total);
      setValores(nuevosValores);
    }
  }, [data]); // Ejecutar cada vez que la data cambie

  var midata = {
    labels: meses,
    datasets: [
      {
        label: "Beneficios",
        data: valores,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  var misoptions = {};

  return <Line data={midata} options={misoptions} />;
}
