import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import patientServices from "@/services/patient.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IPatient } from "@/types/Patient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi").min(3, "Minimal 3 karakter"),
  gender: yup.string().required("Jenis kelamin wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  phone: yup.string().required("Nomor telepon wajib diisi"),
  email: yup.string().email("Format email tidak valid").required("Email wajib diisi"),
  allergies: yup.string().optional(),
  insurance: yup.string().required("Asuransi wajib diisi"),
  birth_date: yup.string().required("Tanggal lahir wajib diisi"),
  blood_type: yup.string().required("Golongan darah wajib diisi"),
  history_of_illness: yup.string().optional(),
  emergency_contact: yup.string().required("Kontak darurat wajib diisi"),
  emergency_contact_phone: yup.string().required("Nomor kontak darurat wajib diisi"),
  emergency_contact_relation: yup.string().required("Hubungan dengan kontak darurat wajib diisi"),
  insurance_number: yup.string().required("Nomor asuransi wajib diisi"),
  identity_type: yup.string().required("Jenis identitas wajib diisi"),
  identity_number: yup.string().required("Nomor identitas wajib diisi"),
});

const useActionPatientModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const addPatient = async (payload: IPatient) => {
    const res = await patientServices.postPatient(payload);
    return res;
  };

  const editPatient = async ({ payload, id }: { payload: IPatient; id: string }) => {
    return patientServices.editPatient(payload, id);
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
      phone: "",
      email: "",
      allergies: "",
      insurance: "",
      birth_date: "",
      blood_type: "",
      history_of_illness: "",
      emergency_contact: "",
      emergency_contact_phone: "",
      emergency_contact_relation: "",
      insurance_number: "",
      identity_type: "",
      identity_number: "",
    },
  });

  const {
    mutate: mutateAddPatient,
    isPending: isPendingMutateAddPatient,
    isSuccess: isSuccessMutateAddPatient,
    reset: resetAddPatient,
  } = useMutation({
    mutationFn: addPatient,
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
        message: "Berhasil menambahkan pasien!",
      });
      reset();
    },
  });

  const {
    mutate: mutateEditPatient,
    isPending: isPendingMutateEditPatient,
    isSuccess: isSuccessMutateEditPatient,
    reset: resetEditPatient,
  } = useMutation({
    mutationFn: editPatient,
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

  const handleAddPatient = (data: IPatient) => {
    mutateAddPatient(data);
  };

  const handleEditPatient = (data: IPatient, id: string) => {
    mutateEditPatient({ payload: data, id });
  };

  return {
    control,
    errors,
    isPendingMutateAddPatient,
    isSuccessMutateAddPatient,
    isPendingMutateEditPatient,
    isSuccessMutateEditPatient,
    handleAddPatient,
    handleSubmitForm,
    handleEditPatient,
    resetAddPatient,
    resetEditPatient,
    reset,
  };
};

export default useActionPatientModal;
