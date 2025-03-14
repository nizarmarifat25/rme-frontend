import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
  } from "@heroui/react";
  import UseActionMedicineUnitModal from "./UseActionMedicineUnitModal";
  import { Controller } from "react-hook-form";
  import { Dispatch, SetStateAction, useEffect } from "react";
  
  interface PropsType {
    isOpen: string;
    onClose: () => void;
    refetchMedicineUnit: () => void;
    selectedData: Record<string, unknown>;
    setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
  }
  
  const ActionMedicineUnitModal = (props: PropsType) => {
    const {
      isOpen,
      onClose,
      refetchMedicineUnit,
      selectedData,
      setSelectedData,
    } = props;
  
    const {
      control,
      errors,
      isPendingMutateAddMedicineUnit,
      isSuccessMutateAddMedicineUnit,
      isPendingMutateEditMedicineUnit,
      isSuccessMutateEditMedicineUnit,
      handleSubmitForm,
      handleAddMedicineUnit,
      handleEditMedicineUnit,
      resetAddMedicineUnit,
      resetEditMedicineUnit,
      reset,
    } = UseActionMedicineUnitModal();
  
    useEffect(() => {
      if (isSuccessMutateAddMedicineUnit) {
        onClose();
        refetchMedicineUnit();
        resetAddMedicineUnit();
        reset();
      }
  
      if (isSuccessMutateEditMedicineUnit) {
        onClose();
        refetchMedicineUnit();
        resetEditMedicineUnit();
        reset();
      }
  
      if (isOpen === "edit" && selectedData) {
        reset(selectedData);
        reset({});
      }
    }, [
      isSuccessMutateAddMedicineUnit,
      isSuccessMutateEditMedicineUnit,
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
              ? handleSubmitForm(handleAddMedicineUnit)
              : handleSubmitForm((data) =>
                  handleEditMedicineUnit(
                    data,
                    selectedData.medicine_unit_id as string,
                  ),
                )
          }
        >
          <ModalContent className="m-4">
            <ModalHeader>
              {isOpen === "add" ? "Tambah" : "Perbaharui"} Unit Obat
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
                      label="Nama Unit"
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
                  disabled={isPendingMutateAddMedicineUnit}
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
                      ? isPendingMutateAddMedicineUnit
                      : isPendingMutateEditMedicineUnit
                  }
                  disabled={
                    isOpen === "add"
                      ? isPendingMutateAddMedicineUnit
                      : isPendingMutateEditMedicineUnit
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
  
  export default ActionMedicineUnitModal;
  