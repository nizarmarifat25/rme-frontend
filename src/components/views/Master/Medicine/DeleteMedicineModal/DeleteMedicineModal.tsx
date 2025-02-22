import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";
import { CiWarning } from "react-icons/ci";
import useDeleteMedicineModal from "./useDeleteMedicineModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchMedicine: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteMedicineModal = (props: PropsType) => {
  const { isOpen, onClose, refetchMedicine, selectedId, setSelectedId } = props;

  const {
    mutateDeleteMedicine,
    isPendingMutateDeleteMedicine,
    isSuccessMutateDeleteMedicine,
  } = useDeleteMedicineModal();

  useEffect(() => {
    if (isSuccessMutateDeleteMedicine) {
      onClose();
      refetchMedicine();
    }
  }, [isSuccessMutateDeleteMedicine]);

  return (
    <Modal
      isOpen={isOpen === "delete"}
      onClose={onClose}
      placement="center"
      scrollBehavior="inside"
      size="md"
    >
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">Hapus Obat</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center text-center">
            <CiWarning className="mb-4 text-5xl text-yellow-500" />
            <p className="text-base text-gray-700">
              Apakah Anda yakin ingin menghapus data obat ini?
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center gap-4">
          <Button
            variant="bordered"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            color="success"
          >
            Batal
          </Button>
          <Button
            variant="solid"
            color="success"
            disabled={isPendingMutateDeleteMedicine}
            onPress={() => {
              mutateDeleteMedicine(selectedId);
            }}
            className="text-white"
          >
            Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMedicineModal;
