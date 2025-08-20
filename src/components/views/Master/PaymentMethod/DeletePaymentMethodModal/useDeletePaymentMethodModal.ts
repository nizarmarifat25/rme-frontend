import { ToasterContext } from "@/contexts/ToasterContext";
import paymentMethodServices from "@/services/payment_method.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeletePaymentMethodModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deletePaymentMethod = async (id: string) => {
    const res = await paymentMethodServices.deletePaymentMethod(id);

    return res;
  };

  const {
    mutate: mutateDeletePaymentMethod,
    isPending: isPendingMutateDeletePaymentMethod,
    isSuccess: isSuccessMutateDeletePaymentMethod,
  } = useMutation({
    mutationFn: deletePaymentMethod,
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil hapus metode pembayaran",
      });
    },
  });

  return {
    mutateDeletePaymentMethod,
    isPendingMutateDeletePaymentMethod,
    isSuccessMutateDeletePaymentMethod,
  };
};

export default useDeletePaymentMethodModal;
