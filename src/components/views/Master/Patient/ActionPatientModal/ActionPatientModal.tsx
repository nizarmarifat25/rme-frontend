import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import useAddPatientModal from "./UseActionPatientModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchPatient: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ActionPatientModal = (props: PropsType) => {
  const { isOpen, onClose, refetchPatient, selectedData, setSelectedData } =
    props;

  const {
    control,
    errors,
    isPendingMutateAddPatient,
    isSuccessMutateAddPatient,
    isPendingMutateEditPatient,
    isSuccessMutateEditPatient,
    handleSubmitForm,
    handleAddPatient,
    handleEditPatient,
    resetAddPatient,
    resetEditPatient,
    reset,
  } = useAddPatientModal();

  useEffect(() => {
    if (isSuccessMutateAddPatient) {
      onClose();
      refetchPatient();
      resetAddPatient();
      reset();
    }

    if (isSuccessMutateEditPatient) {
      onClose();
      refetchPatient();
      resetEditPatient();
      reset();
    }

    if (isOpen === "edit" && selectedData) {
      reset(selectedData);
      reset({});
    }
  }, [isSuccessMutateAddPatient, isSuccessMutateEditPatient, isOpen]);

  console.log("selectedData", selectedData);

  return (
    <Modal
      isOpen={isOpen === "add" || isOpen === "edit"}
      onClose={() => {
        setSelectedData({
          name: "",
          gender: "",
          address: "",
          phone: "",
          email: "",
          allergies: "",
          insurance: "",
          birth_date: "",
          blood_type: "",
          history_of_illness: "",
          emergency_contact: "",
          emergency_contact_phone: "",
          emergency_contact_relation: "",
          insurance_number: "",
          identity_type: "",
          identity_number: "",
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
            ? handleSubmitForm(handleAddPatient)
            : handleSubmitForm((data) =>
                handleEditPatient(
                  data,
                  selectedData.id as string,
                ),
              )
        }
      >
        <ModalContent className="m-4">
          <ModalHeader>
            {isOpen === "add" ? "Tambah" : "Perbaharui"} Pasien
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
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Alamat"
                    variant="bordered"
                    isInvalid={!!errors.address}
                    errorMessage={errors.address?.message}
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
                    type="number"
                    label="Nomor Telepon"
                    variant="bordered"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
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
                name="insurance"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Asuransi"
                    variant="bordered"
                    isInvalid={!!errors.insurance}
                    errorMessage={errors.insurance?.message}
                  />
                )}
              />
              <Controller
                name="birth_date"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Tanggal Lahir"
                    variant="bordered"
                    type="date"
                    isInvalid={!!errors.birth_date}
                    errorMessage={errors.birth_date?.message}
                  />
                )}
              />
              <Controller
                name="blood_type"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Golongan Darah"
                    variant="bordered"
                    isInvalid={!!errors.blood_type}
                    errorMessage={errors.blood_type?.message}
                  />
                )}
              />
              <Controller
                name="history_of_illness"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Riwayat Penyakit"
                    variant="bordered"
                    isInvalid={!!errors.history_of_illness}
                    errorMessage={errors.history_of_illness?.message}
                  />
                )}
              />
              <Controller
                name="emergency_contact"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Kontak Darurat"
                    variant="bordered"
                    isInvalid={!!errors.emergency_contact}
                    errorMessage={errors.emergency_contact?.message}
                  />
                )}
              />
              <Controller
                name="emergency_contact_phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    type="number"
                    label="Nomor Kontak Darurat"
                    variant="bordered"
                    isInvalid={!!errors.emergency_contact_phone}
                    errorMessage={errors.emergency_contact_phone?.message}
                  />
                )}
              />
              <Controller
                name="emergency_contact_relation"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Hubungan Dengan Kontak Darurat"
                    variant="bordered"
                    isInvalid={!!errors.emergency_contact_relation}
                    errorMessage={errors.emergency_contact_relation?.message}
                  />
                )}
              />
              <Controller
                name="insurance_number"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Nomor Asuransi"
                    variant="bordered"
                    isInvalid={!!errors.insurance_number}
                    errorMessage={errors.insurance_number?.message}
                  />
                )}
              />

              <Controller
                name="identity_type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    selectionMode="single"
                    aria-label="Pilih Type Identitas"
                    label="Tipe Identitas"
                    labelPlacement="inside"
                    variant="bordered"
                    radius="sm"
                    isInvalid={!!errors.identity_type}
                    errorMessage={errors.identity_type?.message}
                    defaultSelectedKeys={
                      isOpen === "edit"
                        ? [String(selectedData.identity_type)]
                        : ""
                    }
                  >
                    <SelectItem key="KTP" value="KTP">
                      KTP 
                    </SelectItem>
                    <SelectItem key="Passport" value="Passport">
                      Passport
                    </SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="identity_number"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Nomor Identitas"
                    variant="bordered"
                    isInvalid={!!errors.identity_number}
                    errorMessage={errors.identity_number?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="bordered"
                onPress={() => {
                  setSelectedData({});
                  onClose();
                  reset();
                }}
                color="success"
                disabled={isPendingMutateAddPatient}
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
                    ? isPendingMutateAddPatient
                    : isPendingMutateEditPatient
                }
                disabled={
                  isOpen === "add"
                    ? isPendingMutateAddPatient
                    : isPendingMutateEditPatient
                }
              >
                Simpan
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ActionPatientModal;
