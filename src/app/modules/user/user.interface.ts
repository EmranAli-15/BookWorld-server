export type TRegister = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string;
}

export type TLogin = {
    email: string,
    password: string
}

export type TUser = {
    name: string,
    email: string,
    password: string,
    image: string,
    phone: string,
    address: string,
    role: string
}