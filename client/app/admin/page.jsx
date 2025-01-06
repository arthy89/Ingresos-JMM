"use client";
import { useRef, useState, useEffect } from 'react';
import { 
  useDisclosure,
  Modal,
  ModalContent, 
} from '@nextui-org/react';
import ConceptoService from '@/services/ConceptoService';
import ConcepsTable from '@/components/Conceptos/ConcepsTable';
import Eliminar from '@/components/Modals/Eliminar';
import Form from '@/components/Conceptos/form';

function page() {
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(20);
  const [search, setSearch] = useState("");

  const { data, mutate, isLoading } = ConceptoService.getData({
    page,
    rowsPerPage: rowPerPage,
    // order_by: "id",
    search,
  });

  // console.log("DATOS: ", data);

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
    await ConceptoService.delete(id);
    mutate();
    setDel(false);
  };

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const refForm = useRef(null);

  return (
    <>
      <ConcepsTable 
        data={data}
        mutate={mutate}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
        search={search}
        setSearch={setSearch}
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
        size='lg'
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
  )
}

export default page