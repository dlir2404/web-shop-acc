import { IPurchase } from "../shared/type/purchase.type";
import http from "../utils/http";

const purchaseService = {
    purchase: async (values: IPurchase) => {
        const data = await http.post<any>('/api/user/buy', values)
        return data
    },
}

export default purchaseService