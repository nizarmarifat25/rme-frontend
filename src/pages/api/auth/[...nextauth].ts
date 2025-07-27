import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserExtended, JWTExtended, SessionExtended } from "@/types/Auth";
import authServices from "@/services/auth";
import instance from "@/libs/axios/instance";
import { access } from "fs";
import endpoint from "@/services/endpoint.constant";


export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 900
    },
    secret: environment.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(
                credentials: Record<"email" | "password", string> | undefined
            ): Promise<UserExtended | null> {

                if (!credentials) {
                    return null;
                }

                const { email, password } = credentials;

                const result = await authServices.login({ email, password });
                console.log(result, "result from authServices.login");

                if (result.status === 200) {
                    console.log(result.data.data, "result.data from authServices.login");

                    const accessToken = result.data.data.access_token;
                    const user = result.data.data;
                    user.access_token = accessToken;



                    try {
                        const { data: menus } = await instance.get(`/menus`, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        });

                        user.menus = menus.data.map((menu: any) => {
                            return {
                                ...menu,
                                iconName: menu.name,
                            };
                        });

                    } catch (error) {
                        console.error("Error fetching menus:", error);
                        user.menus = [];
                    }

                    return user;

                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null }) {
            if (user) {
                token.user = user;
            }
            return token
        },
        async session({ session, token }: { session: SessionExtended; token: JWTExtended }) {
            session.user = token.user;
            session.accessToken = token.user?.access_token;

            return session
        }
    }
})