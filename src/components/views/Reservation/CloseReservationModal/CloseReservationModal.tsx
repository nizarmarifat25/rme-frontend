import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";
import { CiWarning } from "react-icons/ci";
import useCloseReservationModal from "./useCloseReservationModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchReservation: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const CloseReservationModal = (props: PropsType) => {
  const { isOpen, onClose, refetchReservation, selectedData, setSelectedData } =
    props;

  const {
    mutateCloseReservation,
    isPendingMutateCloseReservation,
    isSuccessMutateCloseReservation,
  } = useCloseReservationModal();

  useEffect(() => {
    if (isSuccessMutateCloseReservation) {
      onClose();
      refetchReservation();
    }
  }, [isSuccessMutateCloseReservation]);

  return (
    <Modal
      isOpen={isOpen === "close"}
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
              Apakah Anda yakin ingin mengakhiri kunjungan ini?
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
            disabled={isPendingMutateCloseReservation}
            onPress={() => {
              mutateCloseReservation({
                payload: {
                  payment_method: "cash",
                  payment_status: "paid",
                  latest_status: "closed",
                },
                id: String(selectedData?.medical_record_id),
              });
            }}
            className="text-white"
          >
            Ya, Akhiri
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CloseReservationModal;
