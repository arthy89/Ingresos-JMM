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
import ConceptoService from '@/services/ConceptoService';

const Form = forwardRef(({ save, isEdit, id, onClose, ult, conceptos }, ref) => {
  // End Point
  const endpoint = isEdit
    ? `api/conceptos/${id}?_method=PUT`
    : "api/conceptos";

  // Formulario
  const form = useForm("post", endpoint, formData);

  useEffect(() => {
    const fetchData = async () => {
      console.log('EDIT', isEdit);
      if (isEdit) {
        const concp = await ConceptoService.getId(id);
        console.log("respuestaaaa", concp.concepto);

        form.setData(concp.concepto);
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
          {isEdit ? "Editar Concepto" : "Nuevo Concepto"}
        </ModalHeader>

        <ModalBody>
          <Input
            label="Nombre del Concepto"
            placeholder='Nombre...'
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
          
          <Input
            label="Precio"
            placeholder='S/. ...'
            isRequired
            labelPlacement='outside'
            type='number'
            variant='bordered'
            value={form.data.precio}
            color={form.invalid("precio") ? "danger" : "success"}
            onValueChange={(e) => form.setData("precio", e)}
            onBlur={() => form.validate("precio")}
            isInvalid={form.invalid("precio")}
            errorMessage={form.errors.precio}
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