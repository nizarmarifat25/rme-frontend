import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import insuranceServices from "@/services/insurance.service";
import { IInsurance } from "@/types/Insurance";


const schema = yup.object().shape({
    name: yup.string().required("Nama Asuransi wajib diisi"),
    code: yup.string().required("Kode wajib diisi"),
    contact: yup.string().required("Kontak wajib diisi"),
    email: yup.string().email("Email tidak valid").required("Harap isi Email")
})

const UseActionInsuranceModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const addInsurance = async (payload: IInsurance) => {
        const res = await insuranceServices.postInsurance(payload);
        return res;
    };

    const editInsurance = async ({ payload, id }: { payload: IInsurance; id: string }) => {
        return insuranceServices.editInsurance(payload, id);
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
            code: "",
            contact: "",
            email: ""
        },
    });

    const {
        mutate: mutateAddInsurance,
        isPending: isPendingMutateAddInsurance,
        isSuccess: isSuccessMutateAddInsurance,
        reset: resetAddInsurance,
    } = useMutation({
        mutationFn: addInsurance,
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
                message: "Berhasil menambahkan Asuransi!",
            });
            reset();
        },
    });

    const {
        mutate: mutateEditInsurance,
        isPending: isPendingMutateEditInsurance,
        isSuccess: isSuccessMutateEditInsurance,
        reset: resetEditInsurance,
    } = useMutation({
        mutationFn: editInsurance,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Berhasil mengubah data pasien!",
            });
            reset();
        },
    });

    const handleAddInsurance = (data: IInsurance) => {
        mutateAddInsurance(data);
    };

    const handleEditInsurance = (data: IInsurance, id: string) => {
        console.log(data);

        const updatedData = {
            ...data,
            is_active: data.is_active === true ? 1 : 0
        }

        mutateEditInsurance({ payload: updatedData, id });
    };

    return {
        control,
        errors,
        isPendingMutateAddInsurance,
        isSuccessMutateAddInsurance,
        isPendingMutateEditInsurance,
        isSuccessMutateEditInsurance,
        handleAddInsurance,
        handleSubmitForm,
        handleEditInsurance,
        resetAddInsurance,
        resetEditInsurance,
        reset,
    };
}

export default UseActionInsuranceModal