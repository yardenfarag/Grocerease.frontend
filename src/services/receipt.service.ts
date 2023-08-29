import { Item } from '../models/item'
import { httpService } from './http.service'

export const receiptService = {
    sendReceipt
}

async function sendReceipt(imgUrl: string): Promise<Item[]> {
    const items = await httpService.get('receipt' + imgUrl)
    console.log('items:' + items)
    return items
}