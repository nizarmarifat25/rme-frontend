import {
  Button,
  CalendarDate,
  DatePicker,
  DateValue,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import useAddMedicineModal from "./useActionMedicineModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { parseDate } from "@internationalized/date";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchMedicine: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ActionMedicineModal = (props: PropsType) => {
  const { isOpen, onClose, refetchMedicine, selectedData, setSelectedData } =
    props;

  const {
    control,
    errors,
    dataMedicineCategorys,
    dataMedicineUnits,
    isPendingMutateAddMedicine,
    isSuccessMutateAddMedicine,
    isPendingMutateEditMedicine,
    isSuccessMutateEditMedicine,
    handleSubmitForm,
    handleAddMedicine,
    handleEditMedicine,
    resetAddMedicine,
    resetEditMedicine,
    reset,
  } = useAddMedicineModal();

  useEffect(() => {
    if (isSuccessMutateAddMedicine) {
      onClose();
      refetchMedicine();
      resetAddMedicine()
      reset();
    }

    if (isSuccessMutateEditMedicine) {
      onClose();
      refetchMedicine();
      resetEditMedicine()
      reset();

      console.log({isSuccessMutateEditMedicine});
      
    }

    if (isOpen === "edit" && selectedData) {
      reset(selectedData);
      reset({});
    }
  }, [isSuccessMutateAddMedicine, isSuccessMutateEditMedicine, isOpen]);


  return (
    <Modal
      isOpen={isOpen === "add" || isOpen === "edit"}
      onClose={() => {
        setSelectedData({});
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
            ? handleSubmitForm(handleAddMedicine)
            : handleSubmitForm((data) =>
                handleEditMedicine(data, selectedData.medicine_id as string),
              )
        }
      >
        <ModalContent className="m-4">
          <ModalHeader>
            {isOpen === "add" ? "Tambah" : "Perbaharui"} Obat
          </ModalHeader>
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
                    label="Satuan"
                    labelPlacement="inside"
                    variant="bordered"
                    radius="sm"
                    isInvalid={!!errors.unit}
                    errorMessage={errors.unit?.message}
                    onSelectionChange={(value) => field.onChange(value)}
                  >
                    {dataMedicineUnits.map((unit) => (
                      <SelectItem key={unit.name} value={unit.name}>
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
                    defaultSelectedKeys={
                      isOpen === "edit" ? [String(selectedData.category)] : ""
                    }
                  >
                    {dataMedicineCategorys.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
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
                  <DatePicker
                    variant="bordered"
                    radius="sm"
                    label="Tanggal Kedaluwarsa"
                    showMonthAndYearPickers
                    onChange={(date) => field.onChange(date)}
                    isInvalid={!!errors.expiry_date}
                    errorMessage={errors.expiry_date?.message}
                    defaultValue={
                      selectedData?.expiry_date &&
                      typeof selectedData.expiry_date === "string"
                        ? parseDate(selectedData.expiry_date)
                        : null
                    }
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
                disabled={isPendingMutateAddMedicine}
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
                    ? isPendingMutateAddMedicine
                    : isPendingMutateEditMedicine
                }
                disabled={
                  isOpen === "add"
                    ? isPendingMutateAddMedicine
                    : isPendingMutateEditMedicine
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

export default ActionMedicineModal;
