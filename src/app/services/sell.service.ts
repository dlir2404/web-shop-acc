import { ISell } from "../shared/type/sell.type";
import Http from "../utils/http";
import localStorageService from "./localStorage.service";

const sellService = {
    sell: async (values: ISell) => {
        const token = localStorageService.getValue('DINH_LINH_SHOP_TOKEN')
        const http = new Http(token).instance

        const data = await http.post<any>('/api/user/sell', values)
        return data
    },

    getSolds: async () => {
        const token = localStorageService.getValue('DINH_LINH_SHOP_TOKEN')
        const http = new Http(token).instance

        const data = await http.get<any>('api/user/sold')
        return data
    },

    sendPayInfo: async (values: { id: number, username: string, password: string, payUrl: string }) => {
        const token = localStorageService.getValue('DINH_LINH_SHOP_TOKEN')
        const http = new Http(token).instance

        const data = await http.post<any>('api/user/sell/send-pay-info', values)
        return data
    }
}

export default sellService