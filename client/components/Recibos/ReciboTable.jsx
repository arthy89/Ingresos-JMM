import { useRef, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Input,
  Button,
  DatePicker,
} from "@nextui-org/react";
import {
  MdAutoFixHigh,
  MdEdit,
  MdDeleteForever,
  MdRemoveRedEye,
} from "react-icons/md";
import { PiPencilSimpleFill } from "react-icons/pi";
import { BsTrash2Fill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { BsPrinterFill } from "react-icons/bs";
import { columns } from "./columns";
import jsPDF from "jspdf";
import "jspdf-autotable";
// Fuentes
import { robotoFun } from "@/public/fonts/roboto-normal";
import { thunderFun } from "@/public/fonts/thunder-normal";
import { sfboldFun } from "@/public/fonts/sfbold-normal";
import { cooperFun } from "@/public/fonts/cooper-normal";

jsPDF.API.events.push(["addFonts", robotoFun]);
jsPDF.API.events.push(["addFonts", thunderFun]);
jsPDF.API.events.push(["addFonts", sfboldFun]);
jsPDF.API.events.push(["addFonts", cooperFun]);

function ReciboTable({
  recibos,
  mutate,
  isLoading,
  page,
  setPage,
  rowPerPage,
  setRowPerPage,
  search,
  setSearch,
  fecha,
  setFecha,
  editar,
  setEdit,
  onOpen,
  eliminar,
}) {
  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleFecha = (value) => {
    setFecha(value);
  };

  const pages = useMemo(() => {
    return recibos?.last_page;
  }, [recibos?.total, rowPerPage]);

  const loadingState =
    isLoading || recibos?.data.legth === 0 ? "loading" : "idle";

  // ? PDF
  const pressPdf = (e) => {
    const generatePdf = () => {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const insignia = "/img/jmm.png";
      const jec = "/img/jec.png";

      // Obtener las dimensiones de la página (A4 en mm)
      const pageWidth = doc.internal.pageSize.getWidth(); // 297 mm en landscape
      const pageHeight = doc.internal.pageSize.getHeight(); // 210 mm en landscape

      // Calcular las mitades
      const mitadAncho = pageWidth / 2;

      // Dibujar contenido en el lado izquierdo
      const drawContent = (offsetX) => {
        // Logos
        doc.addImage(insignia, "PNG", 12 + offsetX, 10, 23, 23);
        doc.addImage(jec, "PNG", 110 + offsetX, 10, 30, 20);

        //Fuentes
        // sfbold, cooper, times, thunder, roboto

        doc.setFont("sfbold");
        doc.setFontSize(12);
        doc.text("Institución Educativa Secundaria", 75 + offsetX, 15, {
          align: "center",
        });

        doc.setFont("cooper");
        doc.setFontSize(15);
        doc.text(`"JOSÉ MACEDO MENDOZA"`, 75 + offsetX, 22, {
          align: "center",
        });

        doc.setFont("times", "bold");
        doc.setFontSize(10);
        doc.text("Macusani - Carabaya - Puno", 75 + offsetX, 27, {
          align: "center",
        });

        doc.setFont("thunder", "normal");
        doc.setFontSize(22);
        doc.text("RECIBO DE INGRESOS PROPIOS", 75 + offsetX, 42, {
          align: "center",
        });

        // Fecha
        const [ano, mes, dia] = e.fecha.split("-");
        doc.setFont("sfbold");
        doc.setFontSize(12);
        doc.text("DÍA  |  MES  |  AÑO", 50 + offsetX, 48, { align: "center" });
        doc.text(`${dia}`, 36 + offsetX, 53, { align: "center" });
        doc.text(`${mes}`, 49 + offsetX, 53, { align: "center" });
        doc.text(`${ano}`, 63 + offsetX, 53, { align: "center" });

        // Num del Recibo
        doc.setFont("roboto");
        doc.setFontSize(22);
        doc.setTextColor(255, 0, 0);
        doc.text(`Nº ${String(e.num).padStart(6, 0)}`, 80 + offsetX, 52);
        doc.setTextColor(0, 0, 0);

        // Nombre del Senor
        doc.setFont("sfbold");
        doc.setFontSize(12);
        doc.text("Señor(es): ", 30 + offsetX, 62, { align: "center" });
        doc.setFont("roboto");
        doc.text(`${e.senor}`, 42 + offsetX, 62);

        // Tabla de Conceptos
        const columns = ["Nº", "POR CONCEPTO", "PRECIO", "CANT.", "IMPORTE"];

        const tableData = e.items.map((item, index) => [
          index + 1,
          item.concepto,
          item.precio,
          item.cantidad,
          item.importe,
        ]);

        doc.autoTable({
          head: [columns],
          body: tableData,
          startY: 65, // Comienzo de la tabla (ajusta según necesites)
          margin: { left: offsetX + 10 }, // Ajusta la posición en la mitad izquierda o derecha
          tableWidth: mitadAncho - 20, // Limita el ancho de la tabla a la mitad de la hoja
          styles: { fontSize: 10 }, // Estilo general de la tabla
          headStyles: { fillColor: [255, 0, 0] }, // Color de encabezados
        });

        // Obtener la coordenada Y donde termina la tabla
        const finalY = doc.autoTable.previous.finalY;

        // Total
        doc.setFont("sfbold");
        doc.setFontSize(12);
        doc.text("TOTAL:", 90 + offsetX, finalY + 5);
        doc.setFont("roboto");
        doc.text(`S/. ${e.total}`, 110 + offsetX, finalY + 5);

        // Comentarios
        doc.setFont("sfbold");
        doc.setFontSize(9);
        doc.text("Observaciones:", 20 + offsetX, finalY + 15);
        doc.setFont("roboto");
        if (e.comentarios != null) {
          doc.text(`${e.comentarios}`, 20 + offsetX, finalY + 18);
        } else {
          doc.text("Sin bservaciones", 20 + offsetX, finalY + 18);
        }

        // Firma y Sello
        doc.setFont("times", "bold");
        doc.text(
          "........................................",
          40 + offsetX,
          finalY + 55,
          { align: "center" },
        );
        doc.text("TESORERÍA", 40 + offsetX, finalY + 60, { align: "center" });
      };

      // Dibujar el contenido en ambas mitades
      drawContent(0); // Lado izquierdo
      drawContent(mitadAncho); // Lado derecho

      // Opcional: Línea de separación entre mitades
      doc.line(mitadAncho, 0, mitadAncho, pageHeight);

      // Generar un blob para previsualizar
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    };

    generatePdf();
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-2">
          <Input
            className="w-full sm:max-w-[44%]"
            label="Buscador"
            placeholder="Nombres | DNI | Num"
            startContent={<CiSearch size="1.4em" />}
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <DatePicker
            className="max-w-[284px]"
            label="Por Fecha"
            onChange={(e) => handleFecha(e.year + "-" + e.month + "-" + e.day)}
          />

          <div className="flex gap-3">
            <Button
              onPress={() => {
                setEdit(false);
                onOpen();
              }}
              color="primary"
              endContent={<MdAutoFixHigh size="1.4em" />}
            >
              Añadir
            </Button>

            {/* AQUI EL MODAL */}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Total {recibos?.total} Recibos
          </span>

          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => {
                setRowPerPage(e.target.value);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="20">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [rowPerPage, recibos?.total]);

  const renderCell = useCallback((row, columnKey, index) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "id":
        return <p>{index !== undefined && index !== null ? index + 1 : "-"}</p>;

      case "num":
        const num = String(row.num).padStart(6, 0);
        return <p>{num}</p>;

      case "dni":
        return <p>{row.estudiante.dni}</p>;

      case "estudiante":
        return (
          <>
            <p>{row.estudiante.nombre}</p>
            <p className="text-xs italic font-light">Sr(a): {row.senor}</p>
          </>
        );

      case "items":
        return (
          <ul className="list-disc">
            {row.items.map((item) => (
              <li key={item.id}>{item.concepto}</li>
            ))}
          </ul>
        );

      case "total":
        return <p>S/. {row.total}</p>;

      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Button
              onPress={() => editar(row)}
              size="sm"
              color="warning"
              isIconOnly
              variant="ghost"
            >
              <PiPencilSimpleFill size="1.6em" />
            </Button>

            <Button
              onPress={() => pressPdf(row)}
              size="sm"
              color="success"
              isIconOnly
            >
              <BsPrinterFill size="1.6em" />
            </Button>

            <Button
              onPress={() => eliminar(row)}
              size="sm"
              color="danger"
              isIconOnly
            >
              <BsTrash2Fill size="1.6em" />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <span className="text-2xl font-bold">Recibos</span>
      <Table
        aria-label="Tabla de Recibos"
        topContent={topContent}
        isStriped
        bottomContent={
          pages > 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody loadingContent={<Spinner />} loadingState={loadingState}>
          {recibos?.data?.map((item, index) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey, index)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ReciboTable;
