import { Grocery } from "./grocery"

export interface Item extends Grocery {
    id?:string
    expiry?: string
    place?: string
    price?: number
    totalPrice?: number
}