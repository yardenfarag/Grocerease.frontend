import { Market } from '../models/Market'
import { Grocery } from '../models/grocery'
import { httpService } from './http.service'

export const priceService = {
    getPrices
}

async function getPrices(args: { pos: { lat: number, lng: number }, rad: number, items?: Grocery[] }): Promise<Market[]> {
    let res = await httpService.get('price', args)    
    return res
}