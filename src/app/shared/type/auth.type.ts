
export interface ILogin {
    username: string,
    password: string
}

export interface ILoginResponse {
    errorCode: number,
    id: number,
    username: string,
    createdAt: string,
    updatedAt: string,
    message: string,
    accessToken: string
}

export interface IRegister {
    username: string,
    password: string
}

export interface IRegisterResponse {
    errorCode: number,
    id: number,
    username: string,
    createdAt: string,
    updatedAt: string,
    message: string,
    accessToken: string
}