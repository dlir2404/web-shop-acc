import { IPurchase } from "../shared/type/purchase.type";
import Http from "../utils/http";
import localStorageService from "./localStorage.service";

const purchaseService = {
    purchase: async (values: IPurchase) => {
        const token = localStorageService.getValue('DINH_LINH_SHOP_TOKEN')
        const http = new Http(token).instance

        const data = await http.post<any>('/api/user/buy', values)
        return data
    },

    getPurchased: async () => {
        const token = localStorageService.getValue('DINH_LINH_SHOP_TOKEN')
        const http = new Http(token).instance

        const data = await http.get<any>('api/user/purchased')
        return data
    }
}

export default purchaseService