import { ToasterContext } from "@/contexts/ToasterContext";
import medicineServices from "@/services/medicine.service";
import reservationServices from "@/services/reservation.service";
import { IUpdateStatusReservation } from "@/types/Reservation";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useUpdateStatusReservation = () => {
    const { setToaster } = useContext(ToasterContext);

    const updateStatusReservation = async ({ payload, id }: { payload: IUpdateStatusReservation; id: string }) => {
        const res = await reservationServices.updateStatusReservation(payload, id);
        return res;
    };

    const {
        mutate: mutateUpdateStatusReservation,
        isPending: isPendingMutateUpdateStatusReservation,
        isSuccess: isSuccessMutateUpdateStatusReservation,
    } = useMutation({
        mutationFn: updateStatusReservation,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil memperbaharui status kunjungan",
            });
        },
    });

    return {
        mutateUpdateStatusReservation,
        isPendingMutateUpdateStatusReservation,
        isSuccessMutateUpdateStatusReservation,
    };
};

export default useUpdateStatusReservation;
