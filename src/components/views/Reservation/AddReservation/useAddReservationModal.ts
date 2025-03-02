import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import reservationServices from "@/services/reservation.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IReservation, IReservationStatus } from "@/types/Reservation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import doctorServices from "@/services/doctor.service";
import { IDoctorDropdown } from "@/types/Doctor";
import patientServices from "@/services/patient.service";
import { IPatient } from "@/types/Patient";

const schema = yup.object().shape({
    patient_id: yup.number().required("Pasien wajib diisi"),
    doctor_id: yup.number().required("Dokter wajib diisi"),
    anamnesis: yup.string().required("Keluhan wajib diisi")
});

const useAddReservationModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const getDoctorDropdown = async () => {
        const res = await doctorServices.getDoctorDropdown();
        const { data } = res.data;
        return data;
    };

    const getPatientsDropdown = async () => {
        const res = await patientServices.getPatients();
        const { data } = res.data;
        return data;
    };

    const getReservationStatus = async () => {
        const res = await reservationServices.getReservationStatus();
        const { data } = res;
        return data;
    };


    const { data: dataDoctorDropdown = [] } = useQuery<IDoctorDropdown[]>({
        queryKey: ["doctor-dropdown"],
        queryFn: getDoctorDropdown,
    });

    const { data: dataPatientDropdown = [] } = useQuery<IPatient[]>({
        queryKey: ["patient-dropdown"],
        queryFn: getPatientsDropdown,
    });

    const { data: dataReservationStatusDropdown = [] } = useQuery<IReservationStatus[]>({
        queryKey: ["reservation-status-dropdown"],
        queryFn: getReservationStatus,
    });


    const addReservation = async (payload: IReservation) => {
        const res = await reservationServices.postReservation(payload);
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
            patient_id: undefined,
            doctor_id: undefined,
            anamnesis: undefined
        },
    });

    const {
        mutate: mutateAddReservation,
        isPending: isPendingMutateAddReservation,
        isSuccess: isSuccessMutateAddReservation,
        reset: resetAddReservation,
    } = useMutation({
        mutationFn: addReservation,
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
                message: "Berhasil menambahkan data kunjungan pasien!",
            });
            reset();
        },
    });

    const handleAddReservation = (data: IReservation) => {
        const updatedData = {
            ...data,
            latest_status: "scheduled",
        };

        mutateAddReservation(updatedData);
    };

    return {
        control,
        errors,
        dataDoctorDropdown,
        dataPatientDropdown,
        dataReservationStatusDropdown,
        isPendingMutateAddReservation,
        isSuccessMutateAddReservation,
        handleAddReservation,
        handleSubmitForm,
        resetAddReservation,
        reset,
    };
};

export default useAddReservationModal;
