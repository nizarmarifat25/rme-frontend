import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import medicineServices from "@/services/medicine.service"; 
import { ToasterContext } from "@/contexts/ToasterContext";
import { IMedicineUnit } from "@/types/Medicine";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi").min(3, "Minimal 3 karakter"),
});

const UseActionMedicineUnitModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const getMedicineUnits = async () => {
    const res = await medicineServices.getMedicineUnits();
    const { data } = res.data;
    return data;
  };

  const { data: dataMedicineUnits = [] } = useQuery<IMedicineUnit[]>({
    queryKey: ["medicine-units"],
    queryFn: getMedicineUnits,
  });

  const addMedicineUnit = async (payload: IMedicineUnit) => {
    return medicineServices.postMedicineUnit(payload);
  };

  const editMedicineUnit = async ({ payload, id }: { payload: IMedicineUnit; id: string }) => {
    return medicineServices.editMedicineUnit(payload, id);
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
    mutate: mutateAddMedicineUnit,
    isPending: isPendingMutateAddMedicineUnit,
    isSuccess: isSuccessMutateAddMedicineUnit,
    reset: resetAddMedicineUnit,
  } = useMutation({
    mutationFn: addMedicineUnit,
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
        message: "Berhasil menambahkan unit obat!",
      });
      reset();
    },
  });

  const {
    mutate: mutateEditMedicineUnit,
    isPending: isPendingMutateEditMedicineUnit,
    isSuccess: isSuccessMutateEditMedicineUnit,
    reset: resetEditMedicineUnit,
  } = useMutation({
    mutationFn: editMedicineUnit,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil mengubah unit obat!",
      });
      reset();
    },
  });

  const handleAddMedicineUnit = (data: IMedicineUnit) => {
    mutateAddMedicineUnit(data);
  };

  const handleEditMedicineUnit = (data: IMedicineUnit, id: string) => {
    mutateEditMedicineUnit({ payload: data, id });
  };

  return {
    control,
    errors,
    dataMedicineUnits,
    isPendingMutateAddMedicineUnit,
    isSuccessMutateAddMedicineUnit,
    isPendingMutateEditMedicineUnit,
    isSuccessMutateEditMedicineUnit,
    handleAddMedicineUnit,
    handleSubmitForm,
    handleEditMedicineUnit,
    resetAddMedicineUnit,
    resetEditMedicineUnit,
    reset,
  };
};

export default UseActionMedicineUnitModal;
