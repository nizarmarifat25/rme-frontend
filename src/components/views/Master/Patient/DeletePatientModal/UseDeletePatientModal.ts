import { ToasterContext } from "@/contexts/ToasterContext";
import patientServices from "@/services/patient.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeletePatientModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deletePatient = async (id: string) => {
    const res = await patientServices.deletePatient(id);

    return res;
  };

  const {
    mutate: mutateDeletePatient,
    isPending: isPendingMutateDeletePatient,
    isSuccess: isSuccessMutateDeletePatient,
  } = useMutation({
    mutationFn: deletePatient,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil hapus pasien",
      });
    },
  });

  return {
    mutateDeletePatient,
    isPendingMutateDeletePatient,
    isSuccessMutateDeletePatient,
  };
};

export default useDeletePatientModal;
