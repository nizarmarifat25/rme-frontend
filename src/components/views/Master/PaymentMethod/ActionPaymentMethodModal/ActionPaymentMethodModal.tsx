import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import UseActionPaymentMethodModal from "./useActionPaymentMethodModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchPaymentMethod: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ActionPaymentMethodModal = (props: PropsType) => {
  const {
    isOpen,
    onClose,
    refetchPaymentMethod,
    selectedData,
    setSelectedData,
  } = props;

  const {
    control,
    errors,
    isPendingMutateAddPaymentMethod,
    isSuccessMutateAddPaymentMethod,
    isPendingMutateEditPaymentMethod,
    isSuccessMutateEditPaymentMethod,
    handleSubmitForm,
    handleAddPaymentMethod,
    handleEditPaymentMethod,
    resetAddPaymentMethod,
    resetEditPaymentMethod,
    reset,
  } = UseActionPaymentMethodModal();

  useEffect(() => {
    if (isSuccessMutateAddPaymentMethod) {
      onClose();
      refetchPaymentMethod();
      resetAddPaymentMethod();
      reset();
    }

    if (isSuccessMutateEditPaymentMethod) {
      onClose();
      refetchPaymentMethod();
      resetEditPaymentMethod();
      reset();
    }

    if (isOpen === "edit" && selectedData) {
      reset(selectedData);
      reset({});
    }
  }, [isSuccessMutateAddPaymentMethod, isSuccessMutateEditPaymentMethod, isOpen]);

  return (
    <Modal
      isOpen={isOpen === "add" || isOpen === "edit"}
      onClose={() => {
        setSelectedData({
          name: "",
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
            ? handleSubmitForm(handleAddPaymentMethod)
            : handleSubmitForm((data) =>
                handleEditPaymentMethod(data, selectedData.id as string),
              )
        }
      >
        <ModalContent className="m-4">
          <ModalHeader>
            {isOpen === "add" ? "Tambah" : "Perbaharui"} Metode Pembayaran
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
                    label="Nama Metode Pembayaran"
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
                disabled={isPendingMutateAddPaymentMethod}
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
                    ? isPendingMutateAddPaymentMethod
                    : isPendingMutateEditPaymentMethod
                }
                disabled={
                  isOpen === "add"
                    ? isPendingMutateAddPaymentMethod
                    : isPendingMutateEditPaymentMethod
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

export default ActionPaymentMethodModal;
