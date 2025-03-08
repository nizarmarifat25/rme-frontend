import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import useAddNurseModal from "./useActionNurseModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchNurse: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ActionNurseModal = (props: PropsType) => {
  const { isOpen, onClose, refetchNurse, selectedData, setSelectedData } =
    props;

  const {
    control,
    errors,
    isPendingMutateAddNurse,
    isSuccessMutateAddNurse,
    isPendingMutateEditNurse,
    isSuccessMutateEditNurse,
    handleSubmitForm,
    handleAddNurse,
    handleEditNurse,
    resetAddNurse,
    resetEditNurse,
    reset,
  } = useAddNurseModal();

  useEffect(() => {
    if (isSuccessMutateAddNurse) {
      onClose();
      refetchNurse();
      resetAddNurse();
      reset();
    }

    if (isSuccessMutateEditNurse) {
      onClose();
      refetchNurse();
      resetEditNurse();
      reset({});
      setSelectedData({
        name: "",
        gender: "",
        address: "",
        registration_number: "",
        phone: "",
        sharing_fee: "",
      });
    }

    if (isOpen === "edit" && selectedData) {
      reset(selectedData);
      reset({});
    }
  }, [isSuccessMutateAddNurse, isSuccessMutateEditNurse, isOpen]);

  return (
    <Modal
      isOpen={isOpen === "add" || isOpen === "edit"}
      onClose={() => {
        setSelectedData({
          name: "",
          gender: "",
          address: "",
          registration_number: "",
          phone: "",
          sharing_fee: "",
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
            ? handleSubmitForm(handleAddNurse)
            : handleSubmitForm((data) =>
                handleEditNurse(data, selectedData.nurse_id as string),
              )
        }
      >
        <ModalContent className="m-4">
          <ModalHeader>
            {isOpen === "add" ? "Tambah" : "Perbaharui"} Perawat
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
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    selectionMode="single"
                    aria-label="Pilih jenis Kelamin"
                    label="Jenis Kelamin"
                    labelPlacement="inside"
                    variant="bordered"
                    radius="sm"
                    isInvalid={!!errors.gender}
                    errorMessage={errors.gender?.message}
                    onSelectionChange={(value) => field.onChange(value)}
                  >
                    <SelectItem key="L" value="L">
                      Laki - Laki
                    </SelectItem>
                    <SelectItem key="P" value="P">
                      Perempuan
                    </SelectItem>
                  </Select>
                )}
              />

              <Controller
                name="registration_number"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Nomor Registrasi"
                    variant="bordered"
                    isInvalid={!!errors.registration_number}
                    errorMessage={errors.registration_number?.message}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Nomor Telepon"
                    variant="bordered"
                    type="number"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
              <Controller
                name="sharing_fee"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Fee"
                    variant="bordered"
                    isInvalid={!!errors.sharing_fee}
                    errorMessage={errors.sharing_fee?.message}
                  />
                )}
              />

              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Alamat"
                    labelPlacement="inside"
                    variant="bordered"
                    isInvalid={!!errors.address}
                    errorMessage={errors.address?.message}
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
                disabled={isPendingMutateAddNurse}
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
                    ? isPendingMutateAddNurse
                    : isPendingMutateEditNurse
                }
                disabled={
                  isOpen === "add"
                    ? isPendingMutateAddNurse
                    : isPendingMutateEditNurse
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

export default ActionNurseModal;
