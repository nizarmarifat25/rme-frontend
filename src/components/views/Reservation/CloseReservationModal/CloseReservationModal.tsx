import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import useCloseReservationModal from "./useCloseReservationModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";

interface PropsType {
  isOpen: string;
  onClose: () => void;
  refetchReservation: () => void;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const INSURANCE_METHOD_ID = "insurance";

const CloseReservationModal = (props: PropsType) => {
  const { isOpen, onClose, refetchReservation, selectedData, setSelectedData } =
    props;

  const {
    control,
    errors,
    dataPaymentMethodDrowpdown,
    dataInsuranceDrowpdown,
    mutateCloseReservation,
    isPendingMutateCloseReservation,
    isSuccessMutateCloseReservation,
    handleSubmitForm,
    trigger,
    setValue,
  } = useCloseReservationModal();

  const [step, setStep] = useState(1);

  const selectedPaymentMethod = useWatch({ control, name: "payment_method" });
  const selectedInsurance = useWatch({ control, name: "insurance" });

  useEffect(() => {
    if (isSuccessMutateCloseReservation) {
      onClose();
      refetchReservation();
      setStep(1);
    }
    if (selectedPaymentMethod !== INSURANCE_METHOD_ID) {
      setValue("insurance", undefined);
    }
  }, [isSuccessMutateCloseReservation]);

  const handleNextStep = async () => {
    const isValidPaymentMethod = await trigger("payment_method");

    const isAsuransi = selectedPaymentMethod === INSURANCE_METHOD_ID;

    let isValidInsurance = true;

    if (isAsuransi) {
      isValidInsurance = await trigger("insurance");
    }

    if (isValidPaymentMethod && isValidInsurance) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    mutateCloseReservation({
      payload: {
        payment_method: selectedPaymentMethod,
        payment_status: "paid",
        latest_status: "closed",
        insurance_id: selectedInsurance ? String(selectedInsurance) : "", 
      },
      id: String(selectedData?.medical_record_id),
    });
  };

  const getMethodName = (id: string | undefined) =>
    dataPaymentMethodDrowpdown.find((item) => item.payment_method_id == id)
      ?.name || "-";

  const getInsuranceName = (id: number | undefined) =>
    dataInsuranceDrowpdown.find((item) => item.insurance_id == id)?.name || "-";

  return (
    <Modal
      isOpen={isOpen === "close"}
      onClose={() => {
        onClose();
        setStep(1);
      }}
      placement="center"
      scrollBehavior="inside"
      size="xl"
    >
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">
          {step === 1 ? "Pilih Metode Pembayaran" : "Konfirmasi Pembayaran"}
        </ModalHeader>

        <ModalBody>
          {step === 1 ? (
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="payment_method"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    selectedKey={field.value ?? null}
                    isInvalid={!!errors.payment_method}
                    errorMessage={errors.payment_method?.message}
                    defaultItems={dataPaymentMethodDrowpdown}
                    onSelectionChange={(val) => field.onChange(val)}
                    onClear={() => field.onChange(undefined)}
                    label="Pilih Metode Pembayaran"
                    placeholder="Cari Metode Pembayaran"
                  >
                    {(item) => (
                      <AutocompleteItem key={item.payment_method_id}>
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />

              <Controller
                name="insurance"
                control={control}
                render={({ field }) => (
                  <div
                    className={
                      selectedPaymentMethod === INSURANCE_METHOD_ID
                        ? ""
                        : "hidden"
                    }
                  >
                    <Autocomplete
                      {...field}
                      selectedKey={field.value ?? null}
                      isInvalid={!!errors.insurance}
                      errorMessage={errors.insurance?.message}
                      defaultItems={dataInsuranceDrowpdown}
                      onSelectionChange={(val) => field.onChange(val)}
                      onClear={() => field.onChange(undefined)}
                      label="Pilih Asuransi"
                      placeholder="Cari Asuransi"
                    >
                      {(item) => (
                        <AutocompleteItem key={item.insurance_id}>
                          {item.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>
                )}
              />
            </div>
          ) : (
            <div className="space-y-3 text-gray-800">
              <p>
                <strong>Metode Pembayaran:</strong>{" "}
                {getMethodName(selectedPaymentMethod)}
              </p>
              {selectedPaymentMethod === INSURANCE_METHOD_ID && (
                <p>
                  <strong>Asuransi:</strong>{" "}
                  {getInsuranceName(selectedInsurance)}
                </p>
              )}
              <p className="text-yellow-600">
                Pastikan pilihan sudah sesuai sebelum melanjutkan pembayaran.
              </p>
            </div>
          )}
        </ModalBody>

        <ModalFooter className="flex justify-end gap-4">
          {step === 1 ? (
            <Button
              variant="solid"
              color="success"
              onPress={handleNextStep}
              className="text-white"
            >
              Selanjutnya
            </Button>
          ) : (
            <>
              <Button variant="bordered" onPress={() => setStep(1)}>
                Kembali
              </Button>
              <Button
                variant="solid"
                color="success"
                onPress={handleSubmit}
                disabled={isPendingMutateCloseReservation}
                className="text-white"
              >
                Ya, Lanjutkan Pembayaran
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CloseReservationModal;
