import { useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ILogin } from "@/types/Auth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"

const loginSchema = yup.object().shape({
    email: yup.string().email("Email tidak valid").required("Harap isi Email"),
    password: yup.string().required("Harap isi Password"),
})


const useLogin = () => {
    const router = useRouter()
    
    const [isVisible, setIsVisible] = useState(false);

    const callbackUrl: string = (router.query.callbackUrl as string) || "/admin" 

    const toggleVisibility = () => setIsVisible(!isVisible)


    const { control, handleSubmit, formState: { errors }, setError, reset } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect:false,
            callbackUrl
        })
        if(result?.error && result?.status === 401){
            throw new Error("Email atau Password salah")
        }
    }

    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: loginService,
        onError(error) {
            setError("root", {
                message: error.message,
            })
        },
        onSuccess: () => {
            router.push(callbackUrl)
            reset();
        }
    })

    const handleLogin = (data: ILogin) => {
        mutateLogin(data)
    }

    return { isVisible, toggleVisibility, control, handleSubmit, handleLogin, isPendingLogin, errors }
}

export default useLogin