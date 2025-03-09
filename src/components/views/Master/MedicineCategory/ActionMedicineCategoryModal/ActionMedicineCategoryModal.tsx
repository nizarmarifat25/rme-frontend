import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import UseActionMedicineCategoryModal from "./UseActionMedicineCategoryModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchMedicineCategory: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ActionMedicineCategoryModal = (props: PropsType) => {
  const {
    isOpen,
    onClose,
    refetchMedicineCategory,
    selectedData,
    setSelectedData,
  } = props;

  const {
    control,
    errors,
    isPendingMutateAddMedicineCategory,
    isSuccessMutateAddMedicineCategory,
    isPendingMutateEditMedicineCategory,
    isSuccessMutateEditMedicineCategory,
    handleSubmitForm,
    handleAddMedicineCategory,
    handleEditMedicineCategory,
    resetAddMedicineCategory,
    resetEditMedicineCategory,
    reset,
  } = UseActionMedicineCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddMedicineCategory) {
      onClose();
      refetchMedicineCategory();
      resetAddMedicineCategory();
      reset();
    }

    if (isSuccessMutateEditMedicineCategory) {
      onClose();
      refetchMedicineCategory();
      resetEditMedicineCategory();
      reset();
    }

    if (isOpen === "edit" && selectedData) {
      reset(selectedData);
      reset({});
    }
  }, [
    isSuccessMutateAddMedicineCategory,
    isSuccessMutateEditMedicineCategory,
    isOpen,
  ]);

  return (
    <Modal
      isOpen={isOpen === "add" || isOpen === "edit"}
      onClose={() => {
        setSelectedData({ name: "" });
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
            ? handleSubmitForm(handleAddMedicineCategory)
            : handleSubmitForm((data) =>
                handleEditMedicineCategory(
                  data,
                  selectedData.medicine_category_id as string,
                ),
              )
        }
      >
        <ModalContent className="m-4">
          <ModalHeader>
            {isOpen === "add" ? "Tambah" : "Perbaharui"} Kategori Obat
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Nama Kategori"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
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
                disabled={isPendingMutateAddMedicineCategory}
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
                    ? isPendingMutateAddMedicineCategory
                    : isPendingMutateEditMedicineCategory
                }
                disabled={
                  isOpen === "add"
                    ? isPendingMutateAddMedicineCategory
                    : isPendingMutateEditMedicineCategory
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

export default ActionMedicineCategoryModal;
