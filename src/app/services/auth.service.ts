import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from "../shared/type/auth.type";
import http from "../utils/http";

const authService = {
    login: async (values: ILogin) => {
        const data = await http.post<ILoginResponse>('/api/auth/login', values)
        return data
    },
    register: async (values: IRegister) => {
        const data = await http.post<IRegisterResponse>('/api/auth/register', values)
        return data
    }
}

export default authService