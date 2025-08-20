import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IPaymentMethod } from "@/types/PaymentMethods";
import paymentMethodServices from "@/services/payment_method.service";

const schema = yup.object().shape({
  name: yup.string().required("Nama metode pembayaran wajib diisi"),
  description: yup.string(),
});

const UseActionPaymentMethodModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const addPaymentMethod = async (payload: IPaymentMethod) => {
    const res = await paymentMethodServices.postPaymentMethod(payload);
    return res;
  };

  const editPaymentMethod = async ({
    payload,
    id,
  }: {
    payload: IPaymentMethod;
    id: string;
  }) => {
    return paymentMethodServices.editPaymentMethod(payload, id);
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
      description: "",
    },
  });

  const {
    mutate: mutateAddPaymentMethod,
    isPending: isPendingMutateAddPaymentMethod,
    isSuccess: isSuccessMutateAddPaymentMethod,
    reset: resetAddPaymentMethod,
  } = useMutation({
    mutationFn: addPaymentMethod,
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
        message: "Berhasil menambahkan metode pembayaran!",
      });
      reset();
    },
  });

  const {
    mutate: mutateEditPaymentMethod,
    isPending: isPendingMutateEditPaymentMethod,
    isSuccess: isSuccessMutateEditPaymentMethod,
    reset: resetEditPaymentMethod,
  } = useMutation({
    mutationFn: editPaymentMethod,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil mengubah data metode pembayaran!",
      });
      reset();
    },
  });

  const handleAddPaymentMethod = (data: IPaymentMethod) => {
    const parsedData: IPaymentMethod = {
      ...data,
    };
    mutateAddPaymentMethod(parsedData);
  };

  const handleEditPaymentMethod = (data: IPaymentMethod, id: string) => {
    mutateEditPaymentMethod({ payload: data, id });
  };

  return {
    control,
    errors,
    isPendingMutateAddPaymentMethod,
    isSuccessMutateAddPaymentMethod,
    isPendingMutateEditPaymentMethod,
    isSuccessMutateEditPaymentMethod,
    handleAddPaymentMethod,
    handleSubmitForm,
    handleEditPaymentMethod,
    resetAddPaymentMethod,
    resetEditPaymentMethod,
    reset,
  };
};

export default UseActionPaymentMethodModal;
