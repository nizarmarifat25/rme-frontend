import {
  Button,
  DateInput,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import useAddMedicineModal from "./useAddMedicineModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  refetchMedicine: () => void;
}

const AddMedicineModal = (props: PropsType) => {
  const { isOpen, onClose, refetchMedicine } = props;
  const {
    control,
    errors,
    dataMedicineCategorys,
    dataMedicineUnits,
    isLoadingMedicineCategorys,
    isPendingMutateAddMedicine,
    isSuccessMutateAddMedicine,
    handleSubmitForm,
    handleAddMedicine,
    reset,
  } = useAddMedicineModal();

  useEffect(() => {
    if (isSuccessMutateAddMedicine) {
      onClose();
      refetchMedicine();
    }
  }, [isSuccessMutateAddMedicine]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      placement="center"
      scrollBehavior="inside"
      size="3xl"
    >
      <form onSubmit={handleSubmitForm(handleAddMedicine)}>
        <ModalContent className="m-4">
          <ModalHeader>Tambah Obat</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Kode Obat"
                    variant="bordered"
                    isInvalid={!!errors.code}
                    errorMessage={errors.code?.message}
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Nama Obat"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    selectionMode="single"
                    aria-label="Pilih unit obat"
                    label="Unit"
                    labelPlacement="inside"
                    variant="bordered"
                    radius="sm"
                    isInvalid={!!errors.unit}
                    errorMessage={errors.unit?.message}
                    onSelectionChange={(value) => field.onChange(value)}
                  >
                    {dataMedicineUnits.map((unit) => (
                      <SelectItem
                        key={unit.medicine_unit_id}
                        value={unit.medicine_unit_id}
                      >
                        {unit.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    type="number"
                    label="Harga"
                    variant="bordered"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="stock"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    type="number"
                    label="Stok"
                    variant="bordered"
                    isInvalid={!!errors.stock}
                    errorMessage={errors.stock?.message}
                  />
                )}
              />
              <Controller
                name="dosage"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    radius="sm"
                    labelPlacement="inside"
                    label="Dosis"
                    variant="bordered"
                    isInvalid={!!errors.dosage}
                    errorMessage={errors.dosage?.message}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    selectionMode="single"
                    aria-label="Pilih kategori obat"
                    label="Kategori"
                    labelPlacement="inside"
                    variant="bordered"
                    radius="sm"
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message}
                  >
                    {dataMedicineCategorys.map((category) => (
                      <SelectItem
                        key={category.medicine_category_id}
                        value={category.medicine_category_id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="expiry_date"
                control={control}
                render={({ field }) => (
                  <>
                    <DatePicker
                      variant="bordered"
                      radius="sm"
                      label="Tanggal Kedaluwarsa"
                      onChange={(date) => field.onChange(date)}
                      isInvalid={!!errors.expiry_date}
                      errorMessage={errors.expiry_date?.message}
                    />
                  </>
                )}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="bordered"
                onPress={() => {
                  onClose();
                  reset();
                }}
                color="success"
                disabled={isPendingMutateAddMedicine}
              >
                Batal
              </Button>
              <Button
                variant="solid"
                type="submit"
                color="success"
                className="text-white"
                isLoading={isPendingMutateAddMedicine}
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

export default AddMedicineModal;
