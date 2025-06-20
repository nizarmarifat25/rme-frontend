import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import useUpdateResultReservation from "./useUpdateResultReservationModal";
import { Controller, useFieldArray } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchReservation: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const UpdateResultReservation = (props: PropsType) => {
  const { isOpen, onClose, refetchReservation, selectedData, setSelectedData } =
    props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleUpdateResultReservation,
    reset,
    resetAddReservation,
    isPendingMutateUpdateResultReservation,
    isSuccessMutateUpdateResultReservation,
    dataMedicinesDropdown,
    dataTreatmentDropdown,
    dataNurseDropdown,
  } = useUpdateResultReservation();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "recipes",
  });

  useEffect(() => {
    if (isSuccessMutateUpdateResultReservation) {
      onClose();
      refetchReservation();
      resetAddReservation();
      reset();
    }
  }, [isSuccessMutateUpdateResultReservation]);


  return (
    <Modal
      isOpen={isOpen === "update-result"}
      onClose={() => {
        onClose();
        reset();
      }}
      placement="center"
      scrollBehavior="inside"
      size="3xl"
    >
      <form
        onSubmit={handleSubmitForm((data) =>
          handleUpdateResultReservation(
            data,
            selectedData.medical_record_id as string,
          ),
        )}
      >
        <ModalContent className="m-4">
          <ModalHeader>Update Hasil Kunjungan</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="diagnosis"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Diagnosis"
                    variant="bordered"
                    isInvalid={!!errors.diagnosis}
                    errorMessage={errors.diagnosis?.message}
                  />
                )}
              />
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Notes"
                    variant="bordered"
                    isInvalid={!!errors.notes}
                    errorMessage={errors.notes?.message}
                  />
                )}
              />
              <Controller
                name="treatments"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Pilih Perawatan"
                    variant="bordered"
                    radius="sm"
                    isInvalid={!!errors.treatments}
                    errorMessage={errors.treatments?.message}
                    selectionMode="multiple"
                    onChange={(event) => {
                      field.onChange(event);
                      console.log(event);
                    }}
                  >
                    {dataTreatmentDropdown.map((item) => (
                      <SelectItem
                        key={item.treatment_id}
                        value={item.treatment_id}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="nurses"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    radius="sm"
                    label="Pilih Perawat"
                    variant="bordered"
                    isInvalid={!!errors.nurses}
                    errorMessage={errors.nurses?.message}
                    selectionMode="multiple"
                    onChange={(event) => {
                      field.onChange(event);
                    }}
                  >
                    {dataNurseDropdown.map((item) => (
                      <SelectItem key={item.nurse_id} value={item.nurse_id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Resep</h3>
              {fields.map((item, index) => (
                <div key={item.id} className="mb-4 grid grid-cols-4 gap-4">
                  <Controller
                    name={`recipes.${index}.medicine_id`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Pilih Obat"
                        radius="sm"
                        variant="bordered"
                        isInvalid={!!errors.recipes?.[index]?.medicine_id}
                        errorMessage={
                          errors.recipes?.[index]?.medicine_id?.message
                        }
                        onChange={(event) => {
                          field.onChange(event);
                        }}
                      >
                        {dataMedicinesDropdown.map((med) => (
                          <SelectItem
                            key={med.medicine_id}
                            value={med.medicine_id}
                          >
                            {med.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />

                  <Controller
                    name={`recipes.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        radius="sm"
                        label="Jumlah"
                        variant="bordered"
                        isInvalid={!!errors.recipes?.[index]?.quantity}
                        errorMessage={
                          errors.recipes?.[index]?.quantity?.message
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`recipes.${index}.how_to_use`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        radius="sm"
                        labelPlacement="inside"
                        label="Penggunaan"
                        variant="bordered"
                        isInvalid={!!errors.recipes?.[index]?.how_to_use}
                        errorMessage={
                          errors.recipes?.[index]?.how_to_use?.message
                        }
                      />
                    )}
                  />

                  {fields.length > 1 && (
                    <Button
                      variant="bordered"
                      color="danger"
                      onPress={() => remove(index)}
                    >
                      <FaTrash className="text-lg" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                variant="solid"
                color="primary"
                onPress={() =>
                  append({
                    medicine_id: "",
                    quantity: "",
                    how_to_use: "",
                  })
                }
              >
                Tambah Resep
              </Button>
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
                disabled={isPendingMutateUpdateResultReservation}
              >
                Batal
              </Button>
              <Button
                variant="solid"
                type="submit"
                color="success"
                className="text-white"
                isLoading={isPendingMutateUpdateResultReservation}
                disabled={isPendingMutateUpdateResultReservation}
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

export default UpdateResultReservation;
