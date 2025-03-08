import { ToasterContext } from "@/contexts/ToasterContext";
import medicineServices from "@/services/medicine.service";
import reservationServices from "@/services/reservation.service";
import { ICloseReservation, IUpdateStatusReservation } from "@/types/Reservation";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useCloseReservationModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const closeReservation = async ({ payload, id }: { payload: ICloseReservation; id: string }) => {
        const res = await reservationServices.closeReservation(payload, id);
        return res;
    };

    const {
        mutate: mutateCloseReservation,
        isPending: isPendingMutateCloseReservation,
        isSuccess: isSuccessMutateCloseReservation,
    } = useMutation({
        mutationFn: closeReservation,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil selesaikan Kunjungan",
            });
        },
    });

    return {
        mutateCloseReservation,
        isPendingMutateCloseReservation,
        isSuccessMutateCloseReservation,
    };
};

export default useCloseReservationModal;
