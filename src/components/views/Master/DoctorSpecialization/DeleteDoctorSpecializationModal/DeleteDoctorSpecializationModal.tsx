import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooter,
  } from "@heroui/react";
  import { CiWarning } from "react-icons/ci";
  import useDeleteDoctorSpecializationModal from "./UseDeleteDoctorSpecializationModal";
  import { Dispatch, SetStateAction, useEffect } from "react";
  
  interface PropsType {
    isOpen: string;
    onClose: () => void;
    refetchDoctorSpecialization: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
  }
  
  const DeleteDoctorSpecializationModal = (props: PropsType) => {
    const { isOpen, onClose, refetchDoctorSpecialization, selectedId, setSelectedId } = props;
  
    const {
      mutateDeleteDoctorSpecialization,
      isPendingMutateDeleteDoctorSpecialization,
      isSuccessMutateDeleteDoctorSpecialization,
    } = useDeleteDoctorSpecializationModal();
  
    useEffect(() => {
      if (isSuccessMutateDeleteDoctorSpecialization) {
        onClose();
        refetchDoctorSpecialization();
      }
    }, [isSuccessMutateDeleteDoctorSpecialization]);
  
    return (
      <Modal
        isOpen={isOpen === "delete"}
        onClose={onClose}
        placement="center"
        scrollBehavior="inside"
        size="md"
      >
        <ModalContent>
          <ModalHeader className="text-lg font-semibold">Hapus Spesialis Dokter</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center text-center">
              <CiWarning className="mb-4 text-5xl text-yellow-500" />
              <p className="text-base text-gray-700">
                Apakah Anda yakin ingin menghapus data spesialis dokter ini?
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
              disabled={isPendingMutateDeleteDoctorSpecialization}
              onPress={() => {
                mutateDeleteDoctorSpecialization(selectedId);
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
  
  export default DeleteDoctorSpecializationModal;
  