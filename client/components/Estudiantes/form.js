import { forwardRef, useEffect, useState, useRef, use } from 'react';
import {
  Button,
  Input,
  Textarea,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Divider
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { FaSave } from "react-icons/fa";
import { useForm } from 'laravel-precognition-react';
import { formData } from './formData';
// import ReciboService from '@/services/ReciboServices';
import EstudianteService from '@/services/EstudianteServices';

const Form = forwardRef(({ save, isEdit, id, onClose, ult, conceptos }, ref) => {
  // End Point
  const endpoint = isEdit
    ? `api/estudiantes/${id}?_method=PUT`
    : "api/estudiantes";

  // Formulario
  const form = useForm("post", endpoint, formData);

  useEffect(() => {
    const fetchData = async () => {
      console.log('EDIT', isEdit);
      if (isEdit) {
        const est = await EstudianteService.get(id);

        console.log("respuestaaaa", est.estudiante);
        // setDatos(est);

        form.setData(est.estudiante);
      }
    };

    fetchData();
  }, [isEdit, id]);

  const onSave = async (event) => {
    event.preventDefault();
    // console.log('FORMMMMM', form.data);

    form
      .submit()
      .then(() => {
        save();
        showToast("Estudiante guardado", "success");
      })
      .catch((e) => {
        showToast("Error al guardar el Estudiante", "error");
        console.log("Error!!!!!!", e);
      });
  };

  // * TOAST
  const showToast = (message, type = "success") => {
    if (type === "success") {
      toast.success(message, {
        position: "bottom-right",
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <form ref={ref} onSubmit={onSave} className='flex flex-col gap-2'>
        <ModalHeader className='flex-col gap-1'>
          {isEdit ? "Editar Estudiante" : "Nuevo Estudiante"}
        </ModalHeader>

        <ModalBody>
          <Input
            label="DNI"
            placeholder='DNI del Estudiante'
            isRequired
            labelPlacement='outside'
            type='number'
            variant='bordered'
            value={form.data.dni}
            color={form.invalid("dni") ? "danger" : "success"}
            onValueChange={(e) => form.setData("dni", e)}
            onBlur={() => form.validate("dni")}
            isInvalid={form.invalid("dni")}
            errorMessage={form.errors.dni}
          />

          <Input
            label="Nombre del Estudiante"
            placeholder='Apellidos y Nombres...'
            isRequired
            labelPlacement='outside'
            type='text'
            variant='bordered'
            value={form.data.nombre}
            color={form.invalid("nombre") ? "danger" : "success"}
            onValueChange={(e) => form.setData("nombre", e)}
            onBlur={() => form.validate("nombre")}
            isInvalid={form.invalid("nombre")}
            errorMessage={form.errors.nombre}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            color='danger'
            variant='flat'
            onPress={onClose}
          >
            Cerrar
          </Button>

          <Button
            color='success'
            type='submit'
            endContent={<FaSave size="1.4em" />}
          >
            Guardar
          </Button>
        </ModalFooter>
      </form>
    </>
  );
});

export default Form;