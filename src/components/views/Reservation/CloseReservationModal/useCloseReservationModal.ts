import { ToasterContext } from "@/contexts/ToasterContext";
import insuranceServices from "@/services/insurance.service";
import medicineServices from "@/services/medicine.service";
import paymentMethodServices from "@/services/payment_method.service";
import reservationServices from "@/services/reservation.service";
import { IInsurance } from "@/types/Insurance";
import { IPaymentMethod } from "@/types/PaymentMethods";
import { ICloseReservation } from "@/types/Reservation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";


const useCloseReservationModal = () => {
    const { setToaster } = useContext(ToasterContext);
    const schema = yup.object().shape({
        payment_method: yup.string().required("Metode Pembayaran wajib diisi"),
        insurance: yup
            .number()
            .when("payment_method", {
                is: "insurance",
                then: (schema) => schema.required("Asuransi wajib diisi"),
                otherwise: (schema) => schema.optional(),
            }),
    });


    const getPaymentMethod = async () => {
        const res = await paymentMethodServices.getPaymentMethods();
        const { data } = res.data;
        return data;
    };

    const getInsurance = async () => {
        const res = await insuranceServices.getInsurances();
        const { data } = res.data;
        return data;
    };

    const { data: dataPaymentMethodDrowpdown = [] } = useQuery<IPaymentMethod[]>({
        queryKey: ["payment-method-dropdown"],
        queryFn: getPaymentMethod,
    });

    const { data: dataInsuranceDrowpdown = [] } = useQuery<IInsurance[]>({
        queryKey: ["insurance-dropdown"],
        queryFn: getInsurance,
    });

    const closeReservation = async ({ payload, id }: { payload: ICloseReservation; id: string }) => {
        const res = await reservationServices.closeReservation(payload, id);
        return res;
    };

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        trigger,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            payment_method: undefined,
            insurance: undefined,
        },
        shouldUnregister: false, 
    });

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
        control,
        errors,
        dataPaymentMethodDrowpdown,
        dataInsuranceDrowpdown,
        reset,
        mutateCloseReservation,
        handleSubmitForm,
        isPendingMutateCloseReservation,
        isSuccessMutateCloseReservation,
        trigger,
        setValue
    };
};

export default useCloseReservationModal;
