import { ToasterContext } from "@/contexts/ToasterContext";
import doctorServices from "@/services/doctor.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

const useDeleteDoctorSpecializationModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteDoctorSpecialization = async (id: string) => {
        const res = await doctorServices.deleteDoctorSpecialization(id);
        return res;
    };

    const {
        mutate: mutateDeleteDoctorSpecialization,
        isPending: isPendingMutateDeleteDoctorSpecialization,
        isSuccess: isSuccessMutateDeleteDoctorSpecialization,
    } = useMutation({
        mutationFn: deleteDoctorSpecialization,
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
                message: "Berhasil menghapus spesialis dokter!",
            });
        },
    });

    return {
        mutateDeleteDoctorSpecialization,
        isPendingMutateDeleteDoctorSpecialization,
        isSuccessMutateDeleteDoctorSpecialization,
    };
};

export default useDeleteDoctorSpecializationModal;
