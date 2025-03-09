import { DELAY, PAGE_DEFAULT, SIZE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import medicineServices from "@/services/medicine.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const UseMedicineCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedData, setSelectedData] = useState({});

    const router = useRouter();
    const debounce = useDebounce();

    const currentSize = router.query.size;
    const currentPage = router.query.page;
    const currentKeyword = router.query.keyword;

    const setURL = () => {
        router.replace({
            query: {
                size: currentSize || SIZE_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                keyword: currentKeyword || ""
            }
        });
    };

    const getMedicineCategories = async () => {
        let params = `size=${currentSize}&page=${currentPage}`;
        if (currentKeyword) {
            params += `&keyword=${currentKeyword}`;
        }
        const res = await medicineServices.getMedicineCategories(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataMedicineCategory,
        isLoading: isLoadingMedicineCategory,
        isRefetching: isRefetchingMedicineCategory,
        refetch: refetchMedicineCategory
    } = useQuery({
        queryKey: ["MedicineCategory", currentPage, currentSize, currentKeyword],
        queryFn: getMedicineCategories,
        enabled: router.isReady && !!currentPage && !!currentSize
    });

    const handleChangePage = (page: number) => {
        router.push({
            query: {
                ...router.query,
                page
            }
        });
    };

    const handleChangeSize = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedSize = e.target.value;
        router.push({
            query: {
                ...router.query,
                size: selectedSize,
                page: PAGE_DEFAULT
            }
        });
    };

    const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
            const keyword = e.target.value;
            router.push({
                query: {
                    ...router.query,
                    keyword,
                    page: PAGE_DEFAULT
                }
            });
        }, DELAY);
    };

    const handleClearKeyword = () => {
        router.push({
            query: {
                ...router.query,
                keyword: "",
                page: PAGE_DEFAULT
            }
        });
    };

    return {
        dataMedicineCategory,
        isLoadingMedicineCategory,
        currentPage,
        currentSize,
        isRefetchingMedicineCategory,
        setURL,
        handleChangePage,
        handleChangeSize,
        handleKeyword,
        handleClearKeyword,
        refetchMedicineCategory,
        isModalOpen,
        setIsModalOpen,
        selectedId,
        setSelectedId,
        selectedData,
        setSelectedData
    };
};

export default UseMedicineCategory;
