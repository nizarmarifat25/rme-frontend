import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";
import { CiWarning } from "react-icons/ci";
import useUpdateStatusReservationModal from "./useUpdateStatusReservationModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchReservation: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const UpdateStatusReservationModal = (props: PropsType) => {
  const { isOpen, onClose, refetchReservation, selectedData, setSelectedData } =
    props;

  const {
    mutateUpdateStatusReservation,
    isPendingMutateUpdateStatusReservation,
    isSuccessMutateUpdateStatusReservation,
  } = useUpdateStatusReservationModal();

  useEffect(() => {
    if (isSuccessMutateUpdateStatusReservation) {
      onClose();
      refetchReservation();
    }
  }, [isSuccessMutateUpdateStatusReservation]);

  return (
    <Modal
      isOpen={isOpen === "update-status"}
      onClose={onClose}
      placement="center"
      scrollBehavior="inside"
      size="md"
    >
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">
          Perbaharui Status
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center text-center">
            <p className="text-base text-gray-700">
              Apakah Anda yakin ingin memperbaharui status reservasi?
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center gap-4">
          <Button
            variant="bordered"
            onPress={() => {
              onClose();
              setSelectedData({});
            }}
            color="success"
          >
            Batal
          </Button>
          <Button
            variant="solid"
            color="success"
            disabled={isPendingMutateUpdateStatusReservation}
            onPress={() => {
              mutateUpdateStatusReservation({
                payload: { latest_status: "ongoing_treatment" },
                id: String(selectedData?.medical_record_id),
              });
            }}
            className="text-white"
          >
            Ya, Perbaharui
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateStatusReservationModal;
