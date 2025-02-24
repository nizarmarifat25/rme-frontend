import { ToasterContext } from "@/contexts/ToasterContext";
import nurseServices from "@/services/nurse.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteNurseModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteNurse = async (id: string) => {
    const res = await nurseServices.deleteNurse(id);
    return res;
  };

  const {
    mutate: mutateDeleteNurse,
    isPending: isPendingMutateDeleteNurse,
    isSuccess: isSuccessMutateDeleteNurse,
  } = useMutation({
    mutationFn: deleteNurse,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil hapus perawat",
      });
    },
  });

  return {
    mutateDeleteNurse,
    isPendingMutateDeleteNurse,
    isSuccessMutateDeleteNurse,
  };
};

export default useDeleteNurseModal;
