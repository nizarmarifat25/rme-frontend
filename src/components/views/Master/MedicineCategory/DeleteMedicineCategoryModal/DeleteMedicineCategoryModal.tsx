import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooter,
} from "@heroui/react";
import { CiWarning } from "react-icons/ci";
import useDeleteMedicineCategoryModal from "./UseDeleteMedicineCategoryModal";
import { Dispatch, SetStateAction, useEffect } from "react";

interface PropsType {
    isOpen: string;
    onClose: () => void;
    refetchMedicineCategory: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteMedicineCategoryModal = (props: PropsType) => {
    const { isOpen, onClose, refetchMedicineCategory, selectedId, setSelectedId } = props;

    const {
        mutateDeleteMedicineCategory,
        isPendingMutateDeleteMedicineCategory,
        isSuccessMutateDeleteMedicineCategory,
    } = useDeleteMedicineCategoryModal();

    useEffect(() => {
        if (isSuccessMutateDeleteMedicineCategory) {
            onClose();
            refetchMedicineCategory();
        }
    }, [isSuccessMutateDeleteMedicineCategory]);

    return (
        <Modal
            isOpen={isOpen === "delete"}
            onClose={onClose}
            placement="center"
            scrollBehavior="inside"
            size="md"
        >
            <ModalContent>
                <ModalHeader className="text-lg font-semibold">Hapus Kategori Obat</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col items-center text-center">
                        <CiWarning className="mb-4 text-5xl text-yellow-500" />
                        <p className="text-base text-gray-700">
                            Apakah Anda yakin ingin menghapus kategori obat ini?
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-center gap-4">
                    <Button
                        variant="bordered"
                        onPress={() => {
                            onClose();
                            setSelectedId("");
                        }}
                        color="success"
                    >
                        Batal
                    </Button>
                    <Button
                        variant="solid"
                        color="success"
                        disabled={isPendingMutateDeleteMedicineCategory}
                        onPress={() => {
                            mutateDeleteMedicineCategory(selectedId);
                        }}
                        className="text-white"
                    >
                        Hapus
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteMedicineCategoryModal;