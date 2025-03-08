import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import doctorServices from "@/services/doctor.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IDoctorSpesialization } from "@/types/Doctor"; 
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi").min(3, "Minimal 3 karakter"),
});

const UseActionDoctorSpecializationModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const getDoctorSpecializations = async () => {
    const res = await doctorServices.getDoctorSpecializations();
    const { data } = res.data;
    return data;
  };

  const { data: dataDoctorSpecializations = [] } = useQuery<IDoctorSpesialization[]>({
    queryKey: ["doctor-specializations"],
    queryFn: getDoctorSpecializations,
  });

  const addDoctorSpecialization = async (payload: IDoctorSpesialization) => {
    return doctorServices.postDoctorSpecialization(payload);
  };

  const editDoctorSpecialization = async ({ payload, id }: { payload: IDoctorSpesialization; id: string }) => {
    return doctorServices.editDoctorSpecialization(payload, id);
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
    },
  });

  const {
    mutate: mutateAddDoctorSpecialization,
    isPending: isPendingMutateAddDoctorSpecialization,
    isSuccess: isSuccessMutateAddDoctorSpecialization,
    reset: resetAddDoctorSpecialization,
  } = useMutation({
    mutationFn: addDoctorSpecialization,
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
        message: "Berhasil menambahkan dokter spesialis!",
      });
      reset();
    },
  });

  const {
    mutate: mutateEditDoctorSpecialization,
    isPending: isPendingMutateEditDoctorSpecialization,
    isSuccess: isSuccessMutateEditDoctorSpecialization,
    reset: resetEditDoctorSpecialization,
  } = useMutation({
    mutationFn: editDoctorSpecialization,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil mengubah dokter spesialis!",
      });
      reset();
    },
  });

  const handleAddDoctorSpecialization = (data: IDoctorSpesialization) => {
    mutateAddDoctorSpecialization(data);
  };

  const handleEditDoctorSpecialization = (data: IDoctorSpesialization, id: string) => {
    mutateEditDoctorSpecialization({ payload: data, id });
  };

  return {
    control,
    errors,
    dataDoctorSpecializations,
    isPendingMutateAddDoctorSpecialization,
    isSuccessMutateAddDoctorSpecialization,
    isPendingMutateEditDoctorSpecialization,
    isSuccessMutateEditDoctorSpecialization,
    handleAddDoctorSpecialization,
    handleSubmitForm,
    handleEditDoctorSpecialization,
    resetAddDoctorSpecialization,
    resetEditDoctorSpecialization,
    reset,
  };
};

export default UseActionDoctorSpecializationModal;