import { ToasterContext } from "@/contexts/ToasterContext";
import doctorServices from "@/services/doctor.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteDoctorModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteDoctor = async (id: string) => {
    const res = await doctorServices.deleteDoctor(id);
    return res;
  };

  const {
    mutate: mutateDeleteDoctor,
    isPending: isPendingMutateDeleteDoctor,
    isSuccess: isSuccessMutateDeleteDoctor,
  } = useMutation({
    mutationFn: deleteDoctor,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil hapus dokter",
      });
    },
  });

  return {
    mutateDeleteDoctor,
    isPendingMutateDeleteDoctor,
    isSuccessMutateDeleteDoctor,
  };
};

export default useDeleteDoctorModal;
