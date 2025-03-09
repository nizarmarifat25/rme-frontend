import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import medicineServices from "@/services/medicine.service"; 
import { ToasterContext } from "@/contexts/ToasterContext";
import { IMedicineCategory } from "@/types/Medicine";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi").min(3, "Minimal 3 karakter"),
});

const UseActionMedicineCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const getMedicineCategories = async () => {
    const res = await medicineServices.getMedicineCategories();
    const { data } = res.data;
    return data;
  };

  const { data: dataMedicineCategories = [] } = useQuery<IMedicineCategory[]>({
    queryKey: ["medicine-categories"],
    queryFn: getMedicineCategories,
  });

  const addMedicineCategory = async (payload: IMedicineCategory) => {
    return medicineServices.postMedicineCategory(payload);
  };

  const editMedicineCategory = async ({ payload, id }: { payload: IMedicineCategory; id: string }) => {
    return medicineServices.editMedicineCategory(payload, id);
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
    mutate: mutateAddMedicineCategory,
    isPending: isPendingMutateAddMedicineCategory,
    isSuccess: isSuccessMutateAddMedicineCategory,
    reset: resetAddMedicineCategory,
  } = useMutation({
    mutationFn: addMedicineCategory,
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
        message: "Berhasil menambahkan kategori obat!",
      });
      reset();
    },
  });

  const {
    mutate: mutateEditMedicineCategory,
    isPending: isPendingMutateEditMedicineCategory,
    isSuccess: isSuccessMutateEditMedicineCategory,
    reset: resetEditMedicineCategory,
  } = useMutation({
    mutationFn: editMedicineCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil mengubah kategori obat!",
      });
      reset();
    },
  });

  const handleAddMedicineCategory = (data: IMedicineCategory) => {
    mutateAddMedicineCategory(data);
  };

  const handleEditMedicineCategory = (data: IMedicineCategory, id: string) => {
    mutateEditMedicineCategory({ payload: data, id });
  };

  return {
    control,
    errors,
    dataMedicineCategories,
    isPendingMutateAddMedicineCategory,
    isSuccessMutateAddMedicineCategory,
    isPendingMutateEditMedicineCategory,
    isSuccessMutateEditMedicineCategory,
    handleAddMedicineCategory,
    handleSubmitForm,
    handleEditMedicineCategory,
    resetAddMedicineCategory,
    resetEditMedicineCategory,
    reset,
  };
};

export default UseActionMedicineCategoryModal;
