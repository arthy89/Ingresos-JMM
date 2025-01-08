"use client";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { useDisclosure, Modal, ModalContent } from "@nextui-org/react";
import ReciboTable from "@/components/Recibos/ReciboTable";
import ReciboService from "@/services/ReciboServices";
import ConceptoService from "@/services/ConceptoService";
import Eliminar from "@/components/Modals/Eliminar";
import Form from "@/components/Recibos/form";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  const conceptosRef = useRef(null);

  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [fecha, setFecha] = useState(null);

  const { data, mutate, isLoading } = ReciboService.getData({
    page,
    rowsPerPage: rowPerPage,
    order_by: "-id",
    search,
    fecha: fecha,
  });
  // console.log(data?.last_page);
  // console.log("DATOS: ", data);
  // console.log("ULTIMO: ", data?.data[0]);

  useEffect(() => {
    const listar_conceptos = async () => {
      conceptosRef.current = await ConceptoService.get();
    };
    listar_conceptos();
  }, [conceptosRef]);

  // * FORMULARIO
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  const onSave = () => {
    // console.log("GUARDAR");
    mutate();
    onClose();
  };

  const editar = (e) => {
    console.log(e);
    onOpen();
    setEdit(true);
    setId(e.id);
  };

  // * Funcion para abrir el Modal <Eliminar>
  const [isDel, setDel] = useState(false);
  const [selectData, setSelectData] = useState(null);

  const eliminar = async (e) => {
    // console.log(e);
    setSelectData(e);
    setDel(true);
  };

  // * Funcion para eliminar el Registro (Depende del Servicio de consulta)
  const delReg = async (id) => {
    // console.log(id);
    await ReciboService.delete(id);
    mutate();
    setDel(false);
  };

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const refForm = useRef(null);

  return (
    <>
      <ReciboTable
        recibos={data}
        mutate={mutate}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
        search={search}
        setSearch={setSearch}
        fecha={fecha}
        setFecha={setFecha}
        editar={editar}
        setEdit={setEdit}
        onOpen={onOpen}
        eliminar={eliminar}
      />

      {/* MODALES */}

      {/* FORM */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Form
                save={onSave}
                isEdit={edit}
                id={id}
                onClose={onClose}
                ref={refForm}
                ult={data?.data[0]}
                conceptos={conceptosRef.current}
              />
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Eliminar */}
      <Eliminar
        isOpen={isDel}
        onOpenChange={setDel}
        datos={selectData}
        delReg={delReg}
        onClose={onClose}
      />
    </>
  );
}

export default Page;
