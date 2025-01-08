export const generar_meses = () => {
  const startYear = 2024; // Año de inicio
  const startMonth = 1; // Mes de inicio (Enero)
  const currentDate = new Date(); // Fecha actual
  const currentYear = currentDate.getFullYear(); // Año actual
  const currentMonth = currentDate.getMonth() + 1; // Mes actual (0-indexado, por eso +1)
  
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  
  const result = [];
  
  for (let year = startYear; year <= currentYear; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === currentYear && month > currentMonth) break; // Detenerse al mes actual
      
      const formattedMonth = month.toString().padStart(2, "0"); // Formatear el mes a 2 dígitos
      result.push({
        mes: `${months[month - 1]} - ${year}`, // Nombre del mes y año
        value: `${year}-${formattedMonth}`, // Valor en formato YYYY-MM
      });
    }
  }
  
  return result;
};

export const generar_ano = () => {
  const startYear = 2024; // Año de inicio
  const currentYear = new Date().getFullYear(); // Año actual
  const result = [];

  for (let year = startYear; year <= currentYear; year++) {
    result.push({
      ano: `${year}`, // Año en formato string
      value: `${year}`, // Valor del año
    });
  }

  return result;
};

// Uso de la función
// const monthsArray = generateMonthsArray();
// console.log(monthsArray);