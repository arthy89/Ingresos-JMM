import { useRef, useMemo, useCallback } from 'react'
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
  DatePicker
} from '@nextui-org/react';
import {
  MdAutoFixHigh,
  MdEdit,
  MdDeleteForever,
  MdRemoveRedEye,
} from "react-icons/md";
import { PiPencilSimpleFill } from "react-icons/pi";
import { BsTrash2Fill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { columns } from './columns';

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
  // console.log('DATOS RECIBIDOS', recibos);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleFecha = (value) => {
    setFecha(value);
  }

  const pages = useMemo(() => {
    return recibos?.last_page;
  }, [recibos?.total, rowPerPage]);

  const loadingState = isLoading || recibos?.data.legth === 0 ? "loading" : "idle";
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // const refForm = useRef(null);

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className="flex items-end justify-between gap-2">
          <Input
            className='w-full sm:max-w-[44%]'
            label="Buscador"
            placeholder='Nombres | DNI | Num'
            startContent={<CiSearch/>}
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
              color='primary'
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
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={(e) => {
                setRowPerPage(e.target.value)
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
        return <p>{index !== undefined && index !== null ? index + 1 : '-'}</p>;
      
      case "num":
        const num = String(row.num).padStart(6, 0);
        return <p>{num}</p>

      case "dni":
        return <p>{row.estudiante.dni}</p>

      case "estudiante":
        return (
          <>
            <p>{row.estudiante.nombre}</p>
            <p className='text-xs italic font-light'>Sr(a): {row.senor}</p>
          </>
        );
      
      case "items":
        return (
          <ul className="list-disc">
            {row.items.map((item) => (
              <li key={item.id}>
                {item.concepto}
              </li>
            ))}
          </ul>
        );

      case "total":
        return <p>S/. {row.total}</p>
      
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Button
              onPress={() => editar(row)}
              size='sm'
              color='warning'
              isIconOnly 
              variant="ghost"
            >
              <PiPencilSimpleFill size="1.6em" />
            </Button>

            <Button
              onPress={() => eliminar(row)}
              size='sm'
              color='danger'
              isIconOnly 
            >
              <BsTrash2Fill  size="1.6em" />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <span className='text-2xl font-bold'>Recibos</span>
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

        <TableBody
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {recibos?.data?.map((item, index) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey, index)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ReciboTable