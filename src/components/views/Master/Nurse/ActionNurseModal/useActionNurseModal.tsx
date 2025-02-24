import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import nurseServices from "@/services/nurse.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { INurse } from "@/types/Nurse";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi").min(3, "Minimal 3 karakter"),
  gender: yup.string().required("Jenis kelamin wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  registration_number: yup.string().required("Nomor registrasi wajib diisi"),
  phone: yup.string().required("Nomor telepon wajib diisi"),
  sharing_fee: yup
    .string()
    .typeError("Fee harus angka")
    .required("Fee wajib diisi")
    .min(0, "Minimal 0")
});

const useActionNurseModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const addNurse = async (payload: INurse) => {
    const res = await nurseServices.postNurse(payload);
    console.log(res);
    

    return res;
  };

  const editNurse = async ({
    payload,
    id,
  }: {
    payload: INurse;
    id: string;
  }) => {
    return nurseServices.editNurse(payload, id);
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
      gender: "",
      address: "",
      registration_number: "",
      phone: "",
      sharing_fee: "",
    },
  });

  const {
    mutate: mutateAddNurse,
    isPending: isPendingMutateAddNurse,
    isSuccess: isSuccessMutateAddNurse,
    reset: resetAddNurse,
  } = useMutation({
    mutationFn: addNurse,
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
        message: "Berhasil menambahkan perawat!",
      });
      reset();
    },
  });

  const {
    mutate: mutateEditNurse,
    isPending: isPendingMutateEditNurse,
    isSuccess: isSuccessMutateEditNurse,
    reset: resetEditNurse,
  } = useMutation({
    mutationFn: editNurse,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil mengubah data perawat!",
      });
      reset();
    },
  });

  const handleAddNurse = (data: INurse) => {
    mutateAddNurse(data);
  };

  const handleEditNurse = (data: INurse, id: string) => {
    mutateEditNurse({ payload: data, id });
  };

  return {
    control,
    errors,
    isPendingMutateAddNurse,
    isSuccessMutateAddNurse,
    isPendingMutateEditNurse,
    isSuccessMutateEditNurse,
    handleAddNurse,
    handleSubmitForm,
    handleEditNurse,
    resetAddNurse,
    resetEditNurse,
    reset,
  };
};

export default useActionNurseModal;
