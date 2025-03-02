import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
    email: string,
    password: string
}

interface IActivation {
    code: string
}

interface UserExtended extends User {
    accessToken?: string,
    role?: string,
    menus?: any[];
}

interface SessionExtended extends Session {
    accessToken?: string
}

interface JWTExtended extends JWT {
    user?: UserExtended
}

export type { SessionExtended, ILogin, UserExtended, JWTExtended }