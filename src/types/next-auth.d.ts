import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: DefaultUser & {
            accessToken?: string;
            role?: string;
            menus?: any[];
        };
    }

    interface User extends DefaultUser {
        accessToken?: string;
        role?: string;
        menus?: any[];
    }
}
