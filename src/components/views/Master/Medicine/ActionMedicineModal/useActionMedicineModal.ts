import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import medicineServices from "@/services/medicine.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IMedicine, IMedicineCategory, IMedicineUnits } from "@/types/Medicine";
import { useMutation, useQuery } from "@tanstack/react-query";

const schema = yup.object().shape({
  code: yup.string().required("Kode wajib diisi").min(3, "Minimal 3 karakter"),
  name: yup.string().required("Nama wajib diisi").min(3, "Minimal 3 karakter"),
  category: yup.string().required("Kategori wajib diisi"),
  unit: yup.string().required("Satuan wajib diisi"),
  price: yup
    .string()
    .typeError("Harga harus angka")
    .required("Harga wajib diisi")
    .min(1, "Minimal 1"),
  stock: yup
    .string()
    .typeError("Stok harus angka")
    .required("Stok wajib diisi")
    .min(0, "Minimal 0"),
  dosage: yup.string().required("Dosis wajib diisi"),
  expiry_date: yup.string().required("Tanggal kadaluarsa wajib diisi"),
});

const useActionMedicineModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const getMedicineCategories = async () => {
    const res = await medicineServices.getMedicineCategories();
    const { data } = res.data;
    return data;
  };

  const getMedicineUnits = async () => {
    const res = await medicineServices.getMedicineUnits();
    const { data } = res.data;
    return data;
  };

  const { data: dataMedicineCategorys = [] } = useQuery<IMedicineCategory[]>({
    queryKey: ["medicine-categories"],
    queryFn: getMedicineCategories,
  });

  const { data: dataMedicineUnits = [] } = useQuery<IMedicineUnits[]>({
    queryKey: ["medicine-units"],
    queryFn: getMedicineUnits,
  });

  const addMedicine = async (payload: IMedicine) => {
    const res = await medicineServices.postMedicine(payload);

    return res;
  };

  const editMedicine = async ({
    payload,
    id,
  }: {
    payload: IMedicine;
    id: string;
  }) => {
    return medicineServices.editMedicine(payload, id);
  };

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "",
      name: "",
      unit: "",
      price: "",
      stock: "",
      dosage: "",
      category: "",
      expiry_date: "",
    },
  });

  const {
    mutate: mutateAddMedicine,
    isPending: isPendingMutateAddMedicine,
    isSuccess: isSuccessMutateAddMedicine,
    reset: resetAddMedicine 
  } = useMutation({
    mutationFn: addMedicine,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil menambahkan obat!",
      });
      reset();
    },
  });

  const {
    mutate: mutateEditMedicine,
    isPending: isPendingMutateEditMedicine,
    isSuccess: isSuccessMutateEditMedicine,
    reset: resetEditMedicine 
  } = useMutation({
    mutationFn: editMedicine,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil mengubah data obat!",
      });
      reset();
    },
  });

  const handleAddMedicine = (data: IMedicine) => {
    mutateAddMedicine(data);
  };

  const handleEditMedicine = (data: IMedicine, id: string) => {
    mutateEditMedicine({ payload: data, id });
  };
  

  return {
    control,
    errors,
    dataMedicineCategorys,
    dataMedicineUnits,
    isPendingMutateAddMedicine,
    isSuccessMutateAddMedicine,
    isPendingMutateEditMedicine,
    isSuccessMutateEditMedicine,
    handleAddMedicine,
    handleSubmitForm,
    handleEditMedicine,
    resetAddMedicine,
    resetEditMedicine,
    reset,
  };
};

export default useActionMedicineModal;
