import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import UseActionTreatmentModal from "./UseActionTreatmentModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchTreatment: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ActionTreatmentModal = (props: PropsType) => {
  const { isOpen, onClose, refetchTreatment, selectedData, setSelectedData } =
    props;

  const {
    control,
    errors,
    isPendingMutateAddTreatment,
    isSuccessMutateAddTreatment,
    isPendingMutateEditTreatment,
    isSuccessMutateEditTreatment,
    handleSubmitForm,
    handleAddTreatment,
    handleEditTreatment,
    resetAddTreatment,
    resetEditTreatment,
    reset,
  } = UseActionTreatmentModal();

  useEffect(() => {
    if (isSuccessMutateAddTreatment) {
      onClose();
      refetchTreatment();
      resetAddTreatment();
      reset();
    }

    if (isSuccessMutateEditTreatment) {
      onClose();
      refetchTreatment();
      resetEditTreatment();
      reset();
    }

    if (isOpen === "edit" && selectedData) {
      console.log(selectedData);

      reset(selectedData);
      reset({});
    }
  }, [isSuccessMutateAddTreatment, isSuccessMutateEditTreatment, isOpen]);

  return (
    <Modal
      isOpen={isOpen === "add" || isOpen === "edit"}
      onClose={() => {
        setSelectedData({
          name: "",
          price: "",
        });
        onClose();
        reset();
      }}
      placement="center"
      scrollBehavior="inside"
      size="3xl"
    >
      <form
        onSubmit={
          isOpen === "add"
            ? handleSubmitForm(handleAddTreatment)
            : handleSubmitForm((data) =>
                handleEditTreatment(data, selectedData.treatment_id as string),
              )
        }
      >
        <ModalContent className="m-4">
          <ModalHeader>
            {isOpen === "add" ? "Tambah" : "Perbaharui"} Treatment
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Nama Tindakan"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Harga"
                    type="number"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Deskripsi"
                    labelPlacement="inside"
                    variant="bordered"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="bordered"
                onPress={() => {
                  setSelectedData({});
                  onClose();
                  reset();
                }}
                color="success"
                disabled={isPendingMutateAddTreatment}
              >
                Batal
              </Button>
              <Button
                variant="solid"
                type="submit"
                color="success"
                className="text-white"
                isLoading={
                  isOpen === "add"
                    ? isPendingMutateAddTreatment
                    : isPendingMutateEditTreatment
                }
                disabled={
                  isOpen === "add"
                    ? isPendingMutateAddTreatment
                    : isPendingMutateEditTreatment
                }
              >
                Simpan
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ActionTreatmentModal;
