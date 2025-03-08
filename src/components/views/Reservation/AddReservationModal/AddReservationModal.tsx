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
import useAddReservationModal from "./useAddReservationModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import Link from "next/link";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchReservation: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const AddReservationModal = (props: PropsType) => {
  const { isOpen, onClose, refetchReservation, selectedData, setSelectedData } =
    props;

  const {
    control,
    errors,
    dataDoctorDropdown,
    dataPatientDropdown,
    dataReservationStatusDropdown,
    isPendingMutateAddReservation,
    isSuccessMutateAddReservation,
    handleSubmitForm,
    handleAddReservation,
    resetAddReservation,
    reset,
  } = useAddReservationModal();

  useEffect(() => {
    if (isSuccessMutateAddReservation) {
      onClose();
      refetchReservation();
      resetAddReservation();
      reset();
    }
  }, [isSuccessMutateAddReservation]);

  console.log(errors, "error");

  return (
    <Modal
      isOpen={isOpen === "add"}
      onClose={() => {
        onClose();
        reset();
      }}
      placement="center"
      scrollBehavior="inside"
      size="3xl"
    >
      <form onSubmit={handleSubmitForm(handleAddReservation)}>
        <ModalContent className="m-4">
          <ModalHeader>Tambah Kunjungan</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="doctor_id"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    isInvalid={!!errors.doctor_id}
                    errorMessage={errors.doctor_id?.message}
                    defaultItems={dataDoctorDropdown}
                    onSelectionChange={(value) => field.onChange(value)}
                    label="Pilih Dokter"
                    placeholder="Cari Dokter"
                  >
                    {(item) => (
                      <AutocompleteItem key={item.doctor_id}>
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              <Controller
                name="patient_id"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    isInvalid={!!errors.patient_id}
                    errorMessage={errors.patient_id?.message}
                    onSelectionChange={(value) => field.onChange(value)}
                    defaultItems={dataPatientDropdown}
                    label="Pilih Pasien"
                    placeholder="Cari Pasien"
                  >
                    {(item) => (
                      <AutocompleteItem key={item.patient_id}>
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              <Controller
                name="anamnesis"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    label="Keluhan"
                    variant="bordered"
                    isInvalid={!!errors.anamnesis}
                    errorMessage={errors.anamnesis?.message}
                  />
                )}
              />
            </div>
            <div>
              <small>
                Jika pasien belum terdaftar, daftarkan pasien terlebih dahulu
                dengan klik{" "}
                <Link className="text-green-500" href="/master-data/patient">
                  di sini
                </Link>
                .
              </small>
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
                disabled={isPendingMutateAddReservation}
              >
                Batal
              </Button>
              <Button
                variant="solid"
                type="submit"
                color="success"
                className="text-white"
                isLoading={isPendingMutateAddReservation}
                disabled={isPendingMutateAddReservation}
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

export default AddReservationModal;
