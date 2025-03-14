import { ToasterContext } from "@/contexts/ToasterContext";
import medicineServices from "@/services/medicine.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useDeleteMedicineUnitModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteMedicineUnit = async (id: string) => {
        const res = await medicineServices.deleteMedicineUnit(id);
        return res;
    };

    const {
        mutate: mutateDeleteMedicineUnit,
        isPending: isPendingMutateDeleteMedicineUnit,
        isSuccess: isSuccessMutateDeleteMedicineUnit,
    } = useMutation({
        mutationFn: deleteMedicineUnit,
        onError: (error) => {
            if (error instanceof AxiosError) {
                setToaster({
                    type: "error",
                    message: error.response?.data?.message || "Terjadi kesalahan",
                });
            } else {
                setToaster({
                    type: "error",
                    message: error.message,
                });
            }
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil menghapus unit obat!",
            });
        },
    });

    return {
        mutateDeleteMedicineUnit,
        isPendingMutateDeleteMedicineUnit,
        isSuccessMutateDeleteMedicineUnit,
    };
};

export default useDeleteMedicineUnitModal;