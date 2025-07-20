import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const headers = {
    "Content-Type": "application/json"
}

const instance = axios.create({
    headers,
    timeout: 60 * 1000
})

let cachedSession: SessionExtended | null = null;

instance.interceptors.request.use(

    async (request) => {
        if (!cachedSession) {
            cachedSession = await getSession();
        }

        if (cachedSession?.accessToken) {
            request.headers.Authorization = `Bearer ${cachedSession.accessToken}`;
        }

        const fullUrl = request.baseURL
            ? new URL(request.url ?? "", request.baseURL).toString()
            : request.url;

        console.log("➡️ Request URL:", fullUrl);
        console.log("➡️ Request Data:", request.data);

        return request;
    },
    (error) => Promise.reject(error)
);


instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            await signOut({ callbackUrl: "/auth/login" });
            cachedSession = null;
        }
        return Promise.reject(error);
    }
);

export function clearSessionCache() {
    cachedSession = null;
}

export default instance;
