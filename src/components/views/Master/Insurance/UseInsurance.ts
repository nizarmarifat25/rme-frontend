import { DELAY, PAGE_DEFAULT, SIZE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import insuranceServices from "@/services/insurance.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useInsurance = () => {
    const [isModalOpen, setIsModalOpen] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedData, setSelectedData] = useState({})

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
    const getInsurances = async () => {
        try {
            let params = `size=${currentSize}&page=${currentPage}`;
            if (currentKeyword) {
                params += `&keyword=${currentKeyword}`;
            }

            const res = await insuranceServices.getInsurances(params);
            const { data } = res;
            return data;
        } catch (error) {
            console.error("Error fetching insurances:", error);

            return { error: true, message: "Gagal mengambil data asuransi." };
        }
    };

    const {
        data: dataInsurance,
        isLoading: isLoadingInsurance,
        isRefetching: isRefetchingInsurance,
        refetch: refetchInsurance
    } = useQuery({
        queryKey: ["Insurance", currentPage, currentSize, currentKeyword],
        queryFn: getInsurances,
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
        dataInsurance,
        isLoadingInsurance,
        currentPage,
        currentSize,
        currentKeyword,
        isRefetchingInsurance,
        setURL,
        refetchInsurance,
        handleChangePage,
        handleChangeSize,
        handleKeyword,
        handleClearKeyword,

        isModalOpen,
        setIsModalOpen,

        selectedId,
        setSelectedId,

        selectedData,
        setSelectedData
    };
};

export default useInsurance;
