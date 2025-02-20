import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const nurseServices = {
    getNurses: (params?: string) => instance.get(`${endpoint.NURSE}?${params}`),
}

export default nurseServices