import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import doctorServices from "@/services/doctor.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IDoctor, IDoctorSpesializations } from "@/types/Doctor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi").min(3, "Minimal 3 karakter"),
  gender: yup.string().required("Jenis kelamin wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  specialization: yup.string().required("Spesialisasi wajib diisi"),
  registration_number: yup.string().required("Nomor registrasi wajib diisi"),
  phone: yup.string().required("Nomor telepon wajib diisi"),
  sharing_fee: yup
    .string()
    .typeError("Fee harus angka")
    .required("Fee wajib diisi")
    .min(0, "Minimal 0"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().required("Password wajib diisi").min(8, "Minimal 8 karakter"),
});

const useActionDoctorModal = () => {
  const { setToaster } = useContext(ToasterContext);


  const getDoctorSpecializations = async () => {
    const res = await doctorServices.getDoctorSpecializations();
    const { data } = res.data;
    return data;
  };

  const { data: dataDoctorSpesializations = [] } = useQuery<IDoctorSpesializations[]>({
    queryKey: ["doctor-spesializations"],
    queryFn: getDoctorSpecializations,
  });

  const addDoctor = async (payload: IDoctor) => {
    return doctorServices.postDoctor(payload);
  };

  const editDoctor = async ({ payload, id }: { payload: IDoctor; id: string }) => {
    return doctorServices.editDoctor(payload, id);
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
      specialization: "",
      registration_number: "",
      phone: "",
      sharing_fee: "",
      email: "",
      password: "",
    },
  });

  const {
    mutate: mutateAddDoctor,
    isPending: isPendingMutateAddDoctor,
    isSuccess: isSuccessMutateAddDoctor,
    reset: resetAddDoctor,
  } = useMutation({
    mutationFn: addDoctor,
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
        message: "Berhasil menambahkan dokter!",
      });
      reset();
    },
  });

  const {
    mutate: mutateEditDoctor,
    isPending: isPendingMutateEditDoctor,
    isSuccess: isSuccessMutateEditDoctor,
    reset: resetEditDoctor,
  } = useMutation({
    mutationFn: editDoctor,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil mengubah data dokter!",
      });
      reset();
    },
  });

  const handleAddDoctor = (data: IDoctor) => {
    mutateAddDoctor(data);
  };

  const handleEditDoctor = (data: IDoctor, id: string) => {
    mutateEditDoctor({ payload: data, id });
  };

  return {
    control,
    errors,
    dataDoctorSpesializations,
    isPendingMutateAddDoctor,
    isSuccessMutateAddDoctor,
    isPendingMutateEditDoctor,
    isSuccessMutateEditDoctor,
    handleAddDoctor,
    handleSubmitForm,
    handleEditDoctor,
    resetAddDoctor,
    resetEditDoctor,
    reset,
  };
};

export default useActionDoctorModal;
