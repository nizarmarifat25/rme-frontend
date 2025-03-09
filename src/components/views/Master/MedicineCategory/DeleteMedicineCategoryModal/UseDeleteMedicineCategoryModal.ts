import { ToasterContext } from "@/contexts/ToasterContext";
import medicineServices from "@/services/medicine.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useDeleteMedicineCategoryModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteMedicineCategory = async (id: string) => {
        const res = await medicineServices.deleteMedicineCategory(id);
        return res;
    };

    const {
        mutate: mutateDeleteMedicineCategory,
        isPending: isPendingMutateDeleteMedicineCategory,
        isSuccess: isSuccessMutateDeleteMedicineCategory,
    } = useMutation({
        mutationFn: deleteMedicineCategory,
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
                message: "Berhasil menghapus kategori obat!",
            });
        },
    });

    return {
        mutateDeleteMedicineCategory,
        isPendingMutateDeleteMedicineCategory,
        isSuccessMutateDeleteMedicineCategory,
    };
};

export default useDeleteMedicineCategoryModal;
