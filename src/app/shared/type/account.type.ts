export interface IAccount {
    id: number,
    heroes_num: number,
    costumes_num: number,
    rank: string | null,
    is_full_gems: boolean | null,
    price: number,
    image_url: string,
}

export type IAccounts = {
    count: number,
    data: IAccount[]
}