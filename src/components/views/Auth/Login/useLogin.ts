import { useContext, useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ILogin } from "@/types/Auth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import { ToasterContext } from "@/contexts/ToasterContext"
import { getSession } from "next-auth/react"


const loginSchema = yup.object().shape({
    email: yup.string().email("Email tidak valid").required("Harap isi Email"),
    password: yup.string().required("Harap isi Password"),
})


const useLogin = () => {
    const router = useRouter()

    const [isVisible, setIsVisible] = useState(false);
    const { setToaster } = useContext(ToasterContext)

    const callbackUrl: string = (router.query.callbackUrl as string) || "/owner"

    const toggleVisibility = () => setIsVisible(!isVisible)


    const { control, handleSubmit, formState: { errors }, setError, reset } = useForm({
        resolver: yupResolver(loginSchema)
    })


    const loginService = async (payload: ILogin) => {
        const result = await signIn("credentials", {
            ...payload,
            redirect: false,
        });

                    console.log("Result in UseLogin: ",result);

        // if (result?.error && result?.status === 401) {
            
        //     throw new Error("Email atau Password salah");
        // }

        const session = await getSession();
        const menus = session?.user?.menus || [];

        const firstMenu = menus
            .filter((menu: any) => menu?.path_name)
            .sort((a: any, b: any) => a.menu_order - b.menu_order)[0];

        const callbackPath = firstMenu?.path_name || "/owner";
        return callbackPath;
    }


    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
        mutationFn: loginService,
        onError(error) {
            setToaster({
                type: 'error',
                message: error.message
            })
        },
        onSuccess: (callbackPath) => {
            reset();
            setToaster({
                type: 'success',
                message: 'Login Sukses'
            });
            router.push(callbackPath);
        }
    })

    const handleLogin = (data: ILogin) => {
        mutateLogin(data)
    }

    return { isVisible, toggleVisibility, control, handleSubmit, handleLogin, isPendingLogin, errors }
}

export default useLogin