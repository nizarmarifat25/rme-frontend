import { DELAY, PAGE_DEFAULT, SIZE_DEFAULT } from "@/constans/list.constans";
import useDebounce from "@/hooks/useDebounce";
import nurseServices from "@/services/nurse.service"; 
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

const useNurse = () => {
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

    const getNurses = async () => {
        let params = `size=${currentSize}&page=${currentPage}`;
        if (currentKeyword) {
            params += `&keyword=${currentKeyword}`;
        }
        const res = await nurseServices.getNurses(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataNurse,
        isLoading: isLoadingNurse,
        isRefetching: isRefetchingNurse,
        refetch: refetchNurse
    } = useQuery({
        queryKey: ["Nurse", currentPage, currentSize, currentKeyword],
        queryFn: getNurses,
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
        dataNurse, 
        isLoadingNurse, 
        currentPage, 
        currentSize, 
        isRefetchingNurse, 
        setURL, 
        handleChangePage, 
        handleChangeSize, 
        handleKeyword, 
        handleClearKeyword 
    };
};

export default useNurse;
