import { ToasterContext } from "@/contexts/ToasterContext";
import treatmentServices from "@/services/treatments.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const UseDeleteTreatmentModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTreatment = async (id: string) => {
    const res = await treatmentServices.deleteTreatment(id);

    return res;
  };

  const {
    mutate: mutateDeleteTreatment,
    isPending: isPendingMutateDeleteTreatment,
    isSuccess: isSuccessMutateDeleteTreatment,
  } = useMutation({
    mutationFn: deleteTreatment,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil hapus perawatan",
      });
    },
  });

  return {
    mutateDeleteTreatment,
    isPendingMutateDeleteTreatment,
    isSuccessMutateDeleteTreatment,
  };
};

export default UseDeleteTreatmentModal;
