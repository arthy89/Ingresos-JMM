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
// import { columns } from './columns';

function ConcepsTable({
  data,
  mutate,
  isLoading,
  page,
  setPage,
  rowPerPage,
  setRowPerPage,
  search,
  setSearch,
  editar,
  setEdit,
  onOpen,
  eliminar,
}) {
  const columns = [
    { name: "Nº", uid: "id" },
    { name: "Nombre", uid: "nombre" },
    { name: "Precio", uid: "precio" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleSearch = (value) => {
    setSearch(value);
  };

  const pages = useMemo(() => {
    return data?.last_page;
  }, [data?.total, rowPerPage]);

  const loadingState = isLoading || data?.data.legth === 0 ? "loading" : "idle";

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-2">
          <Input
            className="w-full sm:max-w-[44%]"
            label="Buscador"
            placeholder="Por nombre..."
            startContent={<CiSearch size="1.4em" />}
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
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
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Total {data?.total} Conceptos
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
  }, [rowPerPage, data?.total]);

  const renderCell = useCallback((row, columnKey, index) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "id":
        return <p>{index !== undefined && index !== null ? index + 1 : "-"}</p>;

      case "precio":
        return <p>S/. {row.precio}</p>;

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
      <span className="text-2xl font-bold">Conceptos</span>

      <Table
        aria-label="Tabla de Estudiantes"
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
          {data?.data?.map((item, index) => (
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

export default ConcepsTable;
