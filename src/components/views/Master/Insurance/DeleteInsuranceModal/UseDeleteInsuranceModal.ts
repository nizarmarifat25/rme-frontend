import { ToasterContext } from "@/contexts/ToasterContext";
import insuranceServices from "@/services/insurance.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const UseDeleteInsuranceModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteInsurance = async (id: string) => {
        const res = await insuranceServices.deleteInsurance(id);

        return res;
    };

    const {
        mutate: mutateDeleteInsurance,
        isPending: isPendingMutateDeleteInsurance,
        isSuccess: isSuccessMutateDeleteInsurance,
    } = useMutation({
        mutationFn: deleteInsurance,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil hapus asuransi",
            });
        },
    });

    return {
        mutateDeleteInsurance,
        isPendingMutateDeleteInsurance,
        isSuccessMutateDeleteInsurance,
    };
};

export default UseDeleteInsuranceModal;
