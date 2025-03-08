import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
  } from "@heroui/react";
  import UseActionDoctorSpecializationModal from "./UseActionDoctorSpecializationModal";
  import { Controller } from "react-hook-form";
  import { Dispatch, SetStateAction, useEffect } from "react";
  
  interface PropsType {
    isOpen: string;
    onClose: () => void;
    refetchDoctorSpecialization: () => void;
    selectedData: Record<string, unknown>;
    setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
  }
  
  const ActionDoctorSpecializationModal = (props: PropsType) => {
    const { isOpen, onClose, refetchDoctorSpecialization, selectedData, setSelectedData } =
      props;
  
    const {
      control,
      errors,
      isPendingMutateAddDoctorSpecialization,
      isSuccessMutateAddDoctorSpecialization,
      isPendingMutateEditDoctorSpecialization,
      isSuccessMutateEditDoctorSpecialization,
      handleSubmitForm,
      handleAddDoctorSpecialization,
      handleEditDoctorSpecialization,
      resetAddDoctorSpecialization,
      resetEditDoctorSpecialization,
      reset,
    } = UseActionDoctorSpecializationModal();
  
    useEffect(() => {
      if (isSuccessMutateAddDoctorSpecialization) {
        onClose();
        refetchDoctorSpecialization();
        resetAddDoctorSpecialization();
        reset();
      }
  
      if (isSuccessMutateEditDoctorSpecialization) {
        onClose();
        refetchDoctorSpecialization();
        resetEditDoctorSpecialization();
        reset();
      }
  
      if (isOpen === "edit" && selectedData) {
        reset(selectedData);
        reset({});
      }
    }, [isSuccessMutateAddDoctorSpecialization, isSuccessMutateEditDoctorSpecialization, isOpen]);
  
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
              ? handleSubmitForm(handleAddDoctorSpecialization)
              : handleSubmitForm((data) =>
                  handleEditDoctorSpecialization(data, selectedData.doctor_specialization_id as string)
                )
          }
        >
          <ModalContent className="m-4">
            <ModalHeader>
              {isOpen === "add" ? "Tambah" : "Perbaharui"} Spesialis Dokter
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
                      label="Nama Spesialis"
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
                  disabled={isPendingMutateAddDoctorSpecialization}
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
                      ? isPendingMutateAddDoctorSpecialization
                      : isPendingMutateEditDoctorSpecialization
                  }
                  disabled={
                    isOpen === "add"
                      ? isPendingMutateAddDoctorSpecialization
                      : isPendingMutateEditDoctorSpecialization
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
  
  export default ActionDoctorSpecializationModal;
  