import { ToasterContext } from "@/contexts/ToasterContext";
import medicineServices from "@/services/medicine.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteMedicineModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteMedicine = async (id: string) => {
    const res = await medicineServices.deleteMedicine(id);

    return res;
  };

  const {
    mutate: mutateDeleteMedicine,
    isPending: isPendingMutateDeleteMedicine,
    isSuccess: isSuccessMutateDeleteMedicine,
  } = useMutation({
    mutationFn: deleteMedicine,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil hapus obat",
      });
    },
  });

  return {
    mutateDeleteMedicine,
    isPendingMutateDeleteMedicine,
    isSuccessMutateDeleteMedicine,
  };
};

export default useDeleteMedicineModal;
