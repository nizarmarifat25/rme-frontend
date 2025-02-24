import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";
import { CiWarning } from "react-icons/ci";
import useDeleteDoctorModal from "./useDeleteDoctorModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchDoctor: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteDoctorModal = (props: PropsType) => {
  const { isOpen, onClose, refetchDoctor, selectedId, setSelectedId } = props;

  const {
    mutateDeleteDoctor,
    isPendingMutateDeleteDoctor,
    isSuccessMutateDeleteDoctor,
  } = useDeleteDoctorModal();

  useEffect(() => {
    if (isSuccessMutateDeleteDoctor) {
      onClose();
      refetchDoctor();
    }
  }, [isSuccessMutateDeleteDoctor]);

  return (
    <Modal
      isOpen={isOpen === "delete"}
      onClose={onClose}
      placement="center"
      scrollBehavior="inside"
      size="md"
    >
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">Hapus Dokter</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center text-center">
            <CiWarning className="mb-4 text-5xl text-yellow-500" />
            <p className="text-base text-gray-700">
              Apakah Anda yakin ingin menghapus data dokter ini?
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
            disabled={isPendingMutateDeleteDoctor}
            onPress={() => {
              mutateDeleteDoctor(selectedId);
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

export default DeleteDoctorModal;
