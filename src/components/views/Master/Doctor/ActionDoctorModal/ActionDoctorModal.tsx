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
import UseActionDoctorModal from "./UseActionDoctorModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchDoctor: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ActionDoctorModal = (props: PropsType) => {
  const { isOpen, onClose, refetchDoctor, selectedData, setSelectedData } =
    props;

  const {
    control,
    errors,
    dataDoctorSpesializations,
    isPendingMutateAddDoctor,
    isSuccessMutateAddDoctor,
    isPendingMutateEditDoctor,
    isSuccessMutateEditDoctor,
    handleSubmitForm,
    handleAddDoctor,
    handleEditDoctor,
    resetAddDoctor,
    resetEditDoctor,
    reset,
  } = UseActionDoctorModal();

  useEffect(() => {
    if (isSuccessMutateAddDoctor) {
      onClose();
      refetchDoctor();
      resetAddDoctor();
      reset();
    }

    if (isSuccessMutateEditDoctor) {
      onClose();
      refetchDoctor();
      resetEditDoctor();
      reset();
    }

    if (isOpen === "edit" && selectedData) {
      reset(selectedData);
      reset({});
    }
  }, [isSuccessMutateAddDoctor, isSuccessMutateEditDoctor, isOpen]);

  return (
    <Modal
      isOpen={isOpen === "add" || isOpen === "edit"}
      onClose={() => {
        setSelectedData({
          name: "",
          gender: "",
          address: "",
          specialization_id: "",
          registration_number: "",
          phone: "",
          sharing_fee: "",
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
            ? handleSubmitForm(handleAddDoctor)
            : handleSubmitForm((data) =>
                handleEditDoctor(data, selectedData.id as string),
              )
        }
      >
        <ModalContent className="m-4">
          <ModalHeader>
            {isOpen === "add" ? "Tambah" : "Perbaharui"} Dokter
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
                    defaultSelectedKeys={
                      isOpen === "edit" ? [String(selectedData.gender)] : ""
                    }
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
                name="specialization_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    selectionMode="single"
                    aria-label="Pilih Spesialisasi"
                    label="Spesialisasi"
                    labelPlacement="inside"
                    variant="bordered"
                    radius="sm"
                    isInvalid={!!errors.specialization_id}
                    errorMessage={errors.specialization_id?.message}
                    onSelectionChange={(value) => field.onChange(value)}
                    defaultSelectedKeys={
                      isOpen === "edit"
                        ? [String(selectedData.specialization_id)]
                        : ""
                    }
                  >
                    {dataDoctorSpesializations.map((unit) => (
                      <SelectItem
                        key={unit.id}
                        value={unit.name}
                      >
                        {unit.name}
                      </SelectItem>
                    ))}
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
                    value={field.value?.toString() ?? ""} 
                    onChange={(e) => field.onChange(e.target.value)} //
                    labelPlacement="inside"
                    label="Fee"
                    variant="bordered"
                    type="number"
                    isInvalid={!!errors.sharing_fee}
                    errorMessage={errors.sharing_fee?.message}
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
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Password"
                    type="password"
                    variant="bordered"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
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
                disabled={isPendingMutateAddDoctor}
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
                    ? isPendingMutateAddDoctor
                    : isPendingMutateEditDoctor
                }
                disabled={
                  isOpen === "add"
                    ? isPendingMutateAddDoctor
                    : isPendingMutateEditDoctor
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

export default ActionDoctorModal;
