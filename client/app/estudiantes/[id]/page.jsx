"use client";
import { useEffect, useRef, useState } from "react";
import { 
  useDisclosure,
  Modal,
  ModalContent, 
} from '@nextui-org/react';
import { useRouter, useParams } from "next/navigation";
import ReciboTable from '@/components/Recibos/ReciboTable';
import ReciboService from '@/services/ReciboServices';
import ConceptoService from '@/services/ConceptoService';
import EstudianteService from '@/services/EstudianteServices';
import Eliminar from '@/components/Modals/Eliminar';
import Form from '@/components/Recibos/form';

function page() {
  const router = useRouter();
  const params = useParams();

  // ! params.id = estudiante_id
  // console.log("paramsssss", params);

  const conceptosRef = useRef(null);
  const est_found_ref = useRef(null);
  const [est, setEst] = useState(null);

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
    estudiante_id: params.id,
  });

  useEffect(() => {
    const listar_conceptos = async () => {
      conceptosRef.current = await ConceptoService.get();
    };
    listar_conceptos();

    // Buscar al Estudiante
    const buscar_est = async () => {
      est_found_ref.current = await EstudianteService.get(params.id);
      setEst(est_found_ref.current.estudiante);
    };
    buscar_est();
  }, [conceptosRef, est_found_ref]);

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
      <p className='text-xl font-bold'>Estudiante</p>
      <p><span className="font-bold">DNI: </span>{est_found_ref.current?.estudiante.dni}</p>
      <p className="mb-4"><span className="font-bold">Apellidos y Nombres: </span>{est_found_ref.current?.estudiante.nombre}</p>

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
                ult={data?.data[0]}
                conceptos={conceptosRef.current}
                est_data={est_found_ref.current}
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