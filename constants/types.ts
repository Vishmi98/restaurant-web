import { Method } from "axios";

export type NavProps = {
    openNav: () => void;
}

export type MobileNavProps = {
    closeNav: () => void;
    showNav: boolean;
}

export type UserStoreUserType = {
    email: string;
    firstName: string;
    id: number;
    isVerify: boolean;
    lastName: string;
    phone: string;
    avaterPath?: string,
    updateAvaterPath?: string,
}

export type ApiCallOptions = {
    url: string;
    method?: Method; // GET, POST, PUT, etc.
    body?: Record<string, any>;
    params?: Record<string, any>;
    isAuth?: boolean;
}