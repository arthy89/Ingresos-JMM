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
import { FaSearch, FaPlus  } from "react-icons/fa";
import { useForm } from 'laravel-precognition-react';
import { formData } from './formData';
import Items from './Items';
import ReciboService from '@/services/ReciboServices';
import EstudianteService from '@/services/EstudianteServices';

const Form = forwardRef(({ save, isEdit, id, onClose, ult, conceptos, est_data }, ref) => {
  useEffect(() => {
    if (!isEdit) {
      form.setData("num", ult.num + 1);
    }
  }, [isEdit, ult]);

  // Para el input de nombre
  const [isDis, setIsDis] = useState(true);

  const [inputs, setInputs] = useState(false);
  
  // const dniRef = useRef(null);
  const est_found_ref = useRef(null);
  
  // End Point
  const endpoint = isEdit
    ? `api/recibos/${id}?_method=PUT`
    : "api/recibos";

  // Formulario
  const form = useForm("post", endpoint, formData);

  useEffect(() => {
    const fetchData = async () => {
      console.log('EDIT', isEdit);
      if (isEdit) {
        const reciboData = await ReciboService.get(id);

        console.log("respuestaaaa", reciboData.recibo);
        // setDatos(reciboData);

        form.setData(reciboData.recibo);
      }
    };

    fetchData();
  }, [isEdit, id]);

  const onSave = async (event) => {
    event.preventDefault();
    
    // console.log('FORMMMMM', form.data);
    // console.log('EST REEEEF', est_found_ref.current);

    if ((form.data.items).length === 0) { 
      showToast("No hay Conceptos en la lista", "error");
    } else {
      form
        .submit()
        .then(() => {
          save();
          showToast("Reibo guardado", "success");
        })
        .catch((e) => {
          showToast("Error al guardar el Recibo", "error");
          console.log("Error!!!!!!", e);
        });
    }
    
  };

  const buscar_est = async () => {
    try {
      est_found_ref.current = await EstudianteService.getDNI(form.data.estudiante.dni);
      // est_found_ref.current = {estudiante, message}
      
      console.log(est_found_ref.current);
      form.setData("estudiante_id", est_found_ref.current.estudiante.id);
      form.setData("estudiante.nombre", est_found_ref.current.estudiante.nombre);

      setIsDis(true);

      showToast(est_found_ref.current.message, "success");
    } catch (error) {
      // console.log("ERROR", error);
      est_found_ref.current = null;
      form.setData("estudiante_id", "");
      form.setData("estudiante.nombre", "");

      setIsDis(false);

      showToast("Estudiante no encontrado", "error");
    }
    
    setInputs(true);
  };

  // ? Comprobar si se tiene Estudiante por Parametros
  useEffect(() => {
    if (est_data) {
      // console.log("viene de parametros!!!!!!!!", est_data);
      form.setData("estudiante_id", est_data.estudiante.id);
      form.setData("estudiante.dni", est_data.estudiante.dni);
      form.setData("estudiante.nombre", est_data.estudiante.nombre);
      setIsDis(true);
    }
  }, []);

  // console.log('ULT', ult);
  // console.log('CONCEPTOS', conceptos);

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
          {isEdit ? "Editar Recibo" : "Nuevo Recibo"}
        </ModalHeader>

        <ModalBody>
          <div className='grid items-start grid-cols-2 gap-4'>
            <Input
              label="DNI"
              placeholder='DNI del Estudiante'
              isRequired
              labelPlacement='outside'
              type='number'
              variant='bordered'
              value={form.data.estudiante.dni}
              color={form.invalid("estudiante.dni") ? "danger" : "success"}
              onValueChange={(e) => form.setData("estudiante.dni", e)}
              onBlur={() => form.validate("estudiante.dni")}
              isInvalid={form.invalid("estudiante.dni")}
              errorMessage={form.errors["estudiante.dni"]}
            />
            
            {/* Mostrar solo si no se pasa al est_data como parametro */}
            {!est_data && (
              <Button
                className='h-full'
                color='primary'
                startContent={<FaSearch />}
                onPress={buscar_est}
              >
                Buscar
              </Button>
            )}
          </div>

          <Input
            label="Nombre del Estudiante"
            placeholder='Apellidos y Nombres...'
            isRequired
            isReadOnly={isDis}
            labelPlacement='outside'
            type='text'
            variant='bordered'
            value={form.data.estudiante.nombre}
            color={form.invalid("estudiante.nombre") ? "danger" : "success"}
            onValueChange={(e) => form.setData("estudiante.nombre", e)}
            onBlur={() => form.validate("estudiante.nombre")}
            isInvalid={form.invalid("estudiante.nombre")}
            errorMessage={"El nombre del Estudiante es obligatorio"}
          />

          <Divider />

          <div className='grid items-end grid-cols-2 gap-4'>
            <Input
              label="Fecha"
              size='sm'
              isReadOnly
              labelPlacement='outside'
              type='text'
              variant='bordered'
              value={form.data.fecha}
            />
            
            <Input
              label="Num"
              size='sm'
              isReadOnly
              labelPlacement='outside'
              type='text'
              variant='bordered'
              value={String(form.data.num).padStart(6, 0)}
            />
          </div>

          <Input
            label="Señor(es)"
            placeholder='Apellidos y Nombres...'
            isRequired
            labelPlacement='outside'
            type='text'
            variant='bordered'
            value={form.data.senor}
            color={form.invalid("senor") ? "danger" : "success"}
            onValueChange={(e) => form.setData("senor", e)}
            onBlur={() => form.validate("senor")}
            isInvalid={form.invalid("senor")}
            errorMessage={"Los datos del Sr(a). es obligatorio"}
          />

          <Divider />

          {/* Componente de Items */}
          <Items
            form={form}
            conceptos={conceptos}
            certificado={est_found_ref.current?.certificado || est_data?.certificado}
          />

          <Textarea 
            // isClearable
            // className='max-w-xs'
            size='sm'
            label="Comentarios"
            labelPlacement='outside'
            placeholder='Comentarios...'
            variant='bordered'
            value={form.data.comentarios || ""}
            onValueChange={(e) => form.setData("comentarios", e)}
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

      {/* TOAST */}
      <Toaster />
    </>
  );
});

export default Form;