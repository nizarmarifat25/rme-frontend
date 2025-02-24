import { DELAY, PAGE_DEFAULT, SIZE_DEFAULT } from "@/constans/list.constans";
import useDebounce from "@/hooks/useDebounce";
import patientServices from "@/services/patient.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const usePatient = () => {

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

    const getPatients = async () => {
        let params = `size=${currentSize}&page=${currentPage}`;
        if (currentKeyword) {
            params += `&keyword=${currentKeyword}`;
        }
        const res = await patientServices.getPatients(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataPatient,
        isLoading: isLoadingPatient,
        isRefetching: isRefetchingPatient,
        refetch: refetchPatient
    } = useQuery({
        queryKey: ["Patient", currentPage, currentSize, currentKeyword],
        queryFn: getPatients,
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
        dataPatient,
        isLoadingPatient,
        currentPage,
        currentSize,
        isRefetchingPatient,
        refetchPatient,
        setURL,
        handleChangePage,
        handleChangeSize,
        handleKeyword,
        handleClearKeyword,
        isModalOpen,
        setIsModalOpen,
        selectedId,
        setSelectedId,
        selectedData,
        setSelectedData,
    };
};

export default usePatient;
