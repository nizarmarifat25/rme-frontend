import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ITreatment } from "@/types/Treatment";
import treatmentServices from "@/services/treatments.service";


const schema = yup.object().shape({
    name: yup.string().required("Nama perawatan wajib diisi"),
    price: yup.string().required("Harga wajib diisi"),
    description: yup.string()
})

const UseActionTreatmentModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const addTreatment = async (payload: ITreatment) => {
        const res = await treatmentServices.postTreatment(payload);
        return res;
    };

    const editTreatment = async ({ payload, id }: { payload: ITreatment; id: string }) => {
        return treatmentServices.editTreatment(payload, id);
    };

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            price: ""
        },
    });

    const {
        mutate: mutateAddTreatment,
        isPending: isPendingMutateAddTreatment,
        isSuccess: isSuccessMutateAddTreatment,
        reset: resetAddTreatment,
    } = useMutation({
        mutationFn: addTreatment,
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
                message: "Berhasil menambahkan perawatan!",
            });
            reset();
        },
    });

    const {
        mutate: mutateEditTreatment,
        isPending: isPendingMutateEditTreatment,
        isSuccess: isSuccessMutateEditTreatment,
        reset: resetEditTreatment,
    } = useMutation({
        mutationFn: editTreatment,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah data perawatan!",
            });
            reset();
        },
    });

    const handleAddTreatment = (data: ITreatment) => {
        mutateAddTreatment(data);
    };

    const handleEditTreatment = (data: ITreatment, id: string) => {
        mutateEditTreatment({ payload: data, id });
    };

    return {
        control,
        errors,
        isPendingMutateAddTreatment,
        isSuccessMutateAddTreatment,
        isPendingMutateEditTreatment,
        isSuccessMutateEditTreatment,
        handleAddTreatment,
        handleSubmitForm,
        handleEditTreatment,
        resetAddTreatment,
        resetEditTreatment,
        reset,
    };

}

export default UseActionTreatmentModal