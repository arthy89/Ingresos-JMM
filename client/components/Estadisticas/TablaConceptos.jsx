import { Card, CardBody, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRef, useMemo, useCallback } from 'react'

function TablaConceptos({ data, isLoading }) {
  console.log("en la tabla", data);

  const columns = [
    { name: "Nº", uid: "id" },
    { name: "Concepto", uid: "concepto_nombre" },
    { name: "Cant.", uid: "cantidad" },
    { name: "Total", uid: "total" },
  ];

  const renderCell = useCallback((row, columnKey, index) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "id":
        return <p>{index !== undefined && index !== null ? index + 1 : '-'}</p>;

      case "total":
        return <p>S/. {row.total}</p>
      
      default:
        return cellValue;
    }
  }, []);

  const loadingState = isLoading || data?.legth === 0 ? "loading" : "idle";

  return (
    <>
      <span className='text-xl font-bold'>Tabla de Conceptos</span>

      <Table
        aria-label="Tabla de Conceptos"
        isStriped
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "cantidad" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          loadingContent={<Spinner />}
          loadingState={loadingState}
          emptyContent={"Sin registrar Recibos"}
        >
          {data?.recuento_conceptos?.map((concepto, index) => (
            <TableRow key={index}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(concepto, columnKey, index)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TablaConceptos