import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import reservationServices from "@/services/reservation.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IReservation, IReservationStatus, IUpdateReservation } from "@/types/Reservation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IMedicine } from "@/types/Medicine";
import medicineServices from "@/services/medicine.service";
import treatmentServices from "@/services/treatments.service";
import { ITreatment } from "@/types/Treatment";
import { INurse } from "@/types/Nurse";
import nurseServices from "@/services/nurse.service";

const schema = yup.object().shape({
    diagnosis: yup.string().required("Diagnosis wajib diisi"),
    notes: yup.string(),
    recipes: yup.array()
        .of(
            yup.object().shape({
                quantity: yup.string().required("Jumlah wajib diisi").min(1, "Jumlah minimal 1"),
                medicine_id: yup.string().required("Obat wajib diisi").min(1, "Jumlah minimal 1"),
                how_to_use: yup.string().required("Cara Penggunaan wajib diisi"),
            })
        )
        .min(1, "Minimal 1 resep harus ditambahkan")
        .required("Recipes wajib diisi"),
    treatments: yup.string().required("Perawatan wajib diisi"),
    nurses: yup.string().required("Perawat wajib diisi"),
})


const useUpdateResultReservation = () => {
    const { setToaster } = useContext(ToasterContext);


    const getReservationStatus = async () => {
        const res = await reservationServices.getReservationStatus();
        const { data } = res;
        return data;
    };

    const getMedicinesDropdown = async () => {
        const res = await medicineServices.getMedicines();
        const { data } = res.data;
        return data;
    };

    const getTreatmentsDropdown = async () => {
        const res = await treatmentServices.getTreatments();
        const { data } = res.data;
        return data;
    };

    const getNursesDropdown = async () => {
        const res = await nurseServices.getNurses();
        const { data } = res.data;
        return data;
    };

    const { data: dataReservationStatusDropdown = [] } = useQuery<IReservationStatus[]>({
        queryKey: ["reservation-status-dropdown"],
        queryFn: getReservationStatus,
    });

    const { data: dataMedicinesDropdown = [] } = useQuery<IMedicine[]>({
        queryKey: ["medicines-dropdown"],
        queryFn: getMedicinesDropdown,
    });

    const { data: dataTreatmentDropdown = [] } = useQuery<ITreatment[]>({
        queryKey: ["treatments-dropdown"],
        queryFn: getTreatmentsDropdown,
    });

    const { data: dataNurseDropdown = [] } = useQuery<INurse[]>({
        queryKey: ["nurses-dropdown"],
        queryFn: getNursesDropdown,
    });

    const updateResultReservation = async ({ payload, id }: { payload: IUpdateReservation; id: string }) => {
        const res = await reservationServices.updateResultReservation(payload, id);
        return res;
    };

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            diagnosis: "",
            notes: "",
            recipes: [
                {
                    medicine_id: "",
                    quantity: "",
                    how_to_use: "",
                }
            ],
            treatments: "",
            nurses: "",
        },
    });

    const {
        mutate: mutateUpdateResultReservation,
        isPending: isPendingMutateUpdateResultReservation,
        isSuccess: isSuccessMutateUpdateResultReservation,
        reset: resetAddReservation,
    } = useMutation({
        mutationFn: updateResultReservation,
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
                message: "Berhasil memperbarui hasil Kunjungan!",
            });
            reset();
        },
    });

    const handleUpdateResultReservation = (data: IUpdateReservation, id: string) => {
        let tempRecipes = data.recipes ?? [];

        let updatedRecipes = tempRecipes.map(recipe => {
            let matchedMedicine = dataMedicinesDropdown.find(medicine => medicine.medicine_id == recipe.medicine_id);

            return {
                ...recipe,
                price: matchedMedicine?.price ?? 0,
                dosage: matchedMedicine?.dosage ?? "",
            };
        });

        const addTrailingComma = (value?: string) => {
            return value && !value.endsWith(",") ? `${value},` : value ?? "";
        };

        let updatedData: IUpdateReservation = {
            ...data,
            recipes: updatedRecipes,
            latest_status: "pending_payment",
            treatments: addTrailingComma(data.treatments ?? ""),
            nurses: addTrailingComma(data.nurses ?? ""),
        };


        mutateUpdateResultReservation({ payload: updatedData, id });
    };


    return {
        control,
        errors,
        dataReservationStatusDropdown,
        dataTreatmentDropdown,
        dataMedicinesDropdown,
        dataNurseDropdown,
        isPendingMutateUpdateResultReservation,
        isSuccessMutateUpdateResultReservation,
        handleUpdateResultReservation,
        handleSubmitForm,
        resetAddReservation,
        reset,
    };
};

export default useUpdateResultReservation;
