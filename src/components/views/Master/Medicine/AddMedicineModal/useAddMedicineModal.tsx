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
  unit: yup.string().required("Unit wajib diisi"),
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


const useAddMedicineModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const getMedicineCategorys = async () => {
    const res = await medicineServices.getMedicineCategorys();
    const { data } = res.data;
    return data;
  };

  const getMedicineUnits = async () => {
    const res = await medicineServices.getMedicineUnits();
    const { data } = res.data;
    return data;
  };

  const {
    data: dataMedicineCategorys = [],
    isLoading: isLoadingMedicineCategorys,
  } = useQuery<IMedicineCategory[]>({
    queryKey: ["medicine-categories"],
    queryFn: getMedicineCategorys,
  });

  const { data: dataMedicineUnits = [], isLoading: isLoadingMedicineUnits } =
    useQuery<IMedicineUnits[]>({
      queryKey: ["medicine-units"],
      queryFn: getMedicineUnits,
    });

  const addMedicine = async (payload: IMedicine) => {
    const res = await medicineServices.postMedicine(payload);

    return res;
  };

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    mutate: mutateAddMedicine,
    isPending: isPendingMutateAddMedicine,
    isSuccess: isSuccessMutateAddMedicine,
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

  const handleAddMedicine = (data: IMedicine) => {
    mutateAddMedicine(data);
  };

  return {
    control,
    errors,
    dataMedicineCategorys,
    dataMedicineUnits,
    isLoadingMedicineCategorys,
    isPendingMutateAddMedicine,
    isSuccessMutateAddMedicine,
    handleAddMedicine,
    handleSubmitForm,
    reset,
  };
};

export default useAddMedicineModal;
