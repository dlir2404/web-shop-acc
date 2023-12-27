import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from "../shared/type/auth.type";
import Http from "../utils/http";

const authService = {
    login: async (values: ILogin) => {
        const http = new Http('no-token').instance
        const data = await http.post<ILoginResponse>('/api/auth/login', values)
        return data
    },
    register: async (values: IRegister) => {
        const http = new Http('no-token').instance
        const data = await http.post<IRegisterResponse>('/api/auth/register', values)
        return data
    }
}

export default authService