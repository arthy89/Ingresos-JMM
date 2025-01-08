import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { BsTrash2Fill } from "react-icons/bs";

function Eliminar({ datos, isOpen, onOpenChange, delReg }) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              {datos && (
                <>
                  <ModalHeader>Eliminar</ModalHeader>

                  <ModalBody>
                    <p>
                      ¿Seguro de eliminar{" "}
                      {datos.num ? (
                        <span>
                          el Recibo{" "}
                          <strong>Nº {String(datos.num).padStart(6, 0)}</strong>
                        </span>
                      ) : (
                        <span>
                          <strong>{datos.nombre}</strong>
                        </span>
                      )}
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="primary" variant="flat" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        delReg(datos.id);
                      }}
                    >
                      <BsTrash2Fill size="1.6em" /> Eliminar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Eliminar;
