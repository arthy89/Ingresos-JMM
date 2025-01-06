import { use, useEffect, useRef, useState } from 'react'
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuBadgeInfo } from "react-icons/lu";

function Items({ form, conceptos, certificado }) {
  
  const [key, setKey] = useState(0); // Para controlar el Select
  const [item, setItem] = useState({
    concepto: "",
    cantidad: "",
    precio: "",
    importe: "",
  });

  const handle_sel_concepto = (value) => {
    const concpEncontrado = conceptos.find((concepto) => concepto.id === Number(value));
    const hay_certificado = concpEncontrado.nombre.toLowerCase().includes('certificado de estudios');

    // Comprobar si el Est ya tiene 'certificado = true'
    // y si el concepto seleccionado es 'certificado de estudios'
    if (hay_certificado && certificado) {
      setItem({
        ...item,
        concepto: concpEncontrado.nombre,
        precio: concpEncontrado.precio/2,
      });
    } else {
      setItem({
        ...item,
        concepto: concpEncontrado.nombre,
        precio: concpEncontrado.precio,
      });
    }

  };

  const agregar = () => {
    if (item.concepto !== "" && item.cantidad !== "") {

      // Se calcula el resultado del importe, se procesa antes de agregar al FormData
      const nuevo_item = {
        ...item,
        importe: parseFloat(item.precio) * parseInt(item.cantidad, 10),
      };

      const updatedItems = [...(form.data.items || []), nuevo_item];
      form.setData("items", updatedItems);

      // Actualizar el Total
      form.setData("total", parseFloat(form.data.total) + nuevo_item.importe);

      // console.log("TOTAAAAAA", form.data.total)
      // console.log("CERRRRRRRRRRRRR", certificado) 
  
      setKey((prevKey) => prevKey + 1); // Forzar el re-renderizado del Select
      setItem({
        concepto: "",
        cantidad: "",
        precio: "",
        importe: "",
      });

    } else if (item.concepto === "") {
      showToast("Seleccione el Concepto", "error");
    } else if (item.cantidad === "") {
      showToast("Agregue la cantidad", "error");
    }
  };

  const quitar = (index) => {
    const items = form.data.items || [];
    const itemDel = items[index];
    // Filtrar el array para eliminar el item en el índice especificado
    const updatedItem = items.filter((_, i) => i !== index);
    
    // Actualizar los datos
    form.setData("items", updatedItem);
    // Actualizar el Total
    form.setData("total", parseFloat(form.data.total) - itemDel.importe);
  }

  // * TOAST
  const showToast = (message, type = "success") => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Select
        size='sm'
        variant='bordered'
        label='Conceptos'
        labelPlacement="outside"
        placeholder="Seleccionar..."
        value={item.concepto}
        key={key} // Para re-renderizarlo de nuevo
        onChange={(e) => {
          const value = e.target.value;
          handle_sel_concepto(value);
        }}
      >
        {conceptos.map((con) => (
          <SelectItem key={con.id} value={con.id.toString()}>
            {con.nombre}
          </SelectItem>
        ))}
      </Select>
      
      <div className='grid items-end grid-cols-3 gap-4'>
        <Input
          label="Precio U."
          placeholder='S/. ...'
          size='sm'
          // isReadOnly
          labelPlacement='outside'
          type='number'
          variant='bordered'
          value={item.precio}
          onChange={(e) => setItem({ ...item, ["precio"]: e.target.value })}
        />

        <Input
          label="Cantidad"
          placeholder='...'
          size='sm'
          labelPlacement='outside'
          type='number'
          variant='bordered'
          value={item.cantidad}
          onChange={(e) => setItem({ ...item, ["cantidad"]: e.target.value })}
        />

        <Button
          color='primary'
          startContent={<FaPlus />}
          size='sm'
          onPress={agregar}
        >
          Agregar
        </Button>
      </div>

      <span className='text-sm text-success'>Listado</span>

      {(certificado && (
        <span className='flex gap-1 text-xs italic font-light'><LuBadgeInfo  size="1.2em" /> Descuento de Certificado</span>
      ))}

      {/* Tabla de Lista de Items */}
      <Table className='' isStriped removeWrapper aria-label="table-temporal">
        <TableHeader>
          <TableColumn>Nº</TableColumn>
          <TableColumn>Concepto</TableColumn>
          <TableColumn>Precio Un.</TableColumn>
          <TableColumn>Cant.</TableColumn>
          <TableColumn>Importe T.</TableColumn>
          <TableColumn>Borrar</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"Sin Items"}>
          {(form.data.items || []).map((itm, index) => (
            <TableRow key={index}>
              <TableCell className='text-xs'>{index + 1}</TableCell>
              <TableCell className='text-xs'>{itm.concepto}</TableCell>
              <TableCell className='text-xs'>S/. {itm.precio}</TableCell>
              <TableCell className='text-xs text-center'>{itm.cantidad}</TableCell>
              <TableCell className='text-xs'>S/. {itm.importe}</TableCell>
              <TableCell>
                <Button
                  onPress={() => quitar(index)}
                  size='sm'
                  color='danger'
                  isIconOnly 
                >
                  <MdDelete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='flex justify-end'>
        <Chip color='danger'>
          <span className='font-medium'>Total:</span> S/.
          {(form.data.total !== 0 
            ? " " + form.data.total
            : " 0.00"
          )}
        </Chip>
      </div>
    </>
  )
}

export default Items;