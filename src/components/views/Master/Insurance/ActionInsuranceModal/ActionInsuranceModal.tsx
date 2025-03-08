import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import UseActionInsuranceModal from "./UseActionInsuranceModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchInsurance: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ActionInsuranceModal = (props: PropsType) => {
  const { isOpen, onClose, refetchInsurance, selectedData, setSelectedData } =
    props;

  const {
    control,
    errors,
    isPendingMutateAddInsurance,
    isSuccessMutateAddInsurance,
    isPendingMutateEditInsurance,
    isSuccessMutateEditInsurance,
    handleSubmitForm,
    handleAddInsurance,
    handleEditInsurance,
    resetAddInsurance,
    resetEditInsurance,
    reset,
  } = UseActionInsuranceModal();

  useEffect(() => {
    if (isSuccessMutateAddInsurance) {
      onClose();
      refetchInsurance();
      resetAddInsurance();
      reset();
    }

    if (isSuccessMutateEditInsurance) {
      onClose();
      refetchInsurance();
      resetEditInsurance();
      reset();
    }

    if (isOpen === "edit" && selectedData) {
      console.log(selectedData);

      reset(selectedData);
      reset({});
    }
  }, [isSuccessMutateAddInsurance, isSuccessMutateEditInsurance, isOpen]);

  return (
    <Modal
      isOpen={isOpen === "add" || isOpen === "edit"}
      onClose={() => {
        setSelectedData({
          name: "",
          type: "",
          address: "",
          policy_number: "",
          phone: "",
          premium: "",
          email: "",
          password: "",
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
            ? handleSubmitForm(handleAddInsurance)
            : handleSubmitForm((data) =>
                handleEditInsurance(data, selectedData.insurance_id as string),
              )
        }
      >
        <ModalContent className="m-4">
          <ModalHeader>
            {isOpen === "add" ? "Tambah" : "Perbaharui"} Asuransi
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
                    label="Nama"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Kode"
                    variant="bordered"
                    isInvalid={!!errors.code}
                    errorMessage={errors.code?.message}
                  />
                )}
              />
              <Controller
                name="contact"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Kontak"
                    variant="bordered"
                    type="number"
                    isInvalid={!!errors.contact}
                    errorMessage={errors.contact?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Email"
                    variant="bordered"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
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
                disabled={isPendingMutateAddInsurance}
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
                    ? isPendingMutateAddInsurance
                    : isPendingMutateEditInsurance
                }
                disabled={
                  isOpen === "add"
                    ? isPendingMutateAddInsurance
                    : isPendingMutateEditInsurance
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

export default ActionInsuranceModal;
